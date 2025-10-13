import { Injectable, inject, signal } from '@angular/core';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { ContractsService } from './contracts.service';
import { BalancesService } from './balances.service';

import { formatToken, parseToken } from '@sandbox/shared/web3/utils/units';
import {
  CONTRACTS,
  SEPOLIA,
  PairKey,
  TokenKey,
  Address,
} from './contracts/addresses';

export type TPairs = {
  key: PairKey;
  label: string;
  tokens: [TokenKey, TokenKey];
};

export type QuickInfo = Awaited<ReturnType<LiquidityService['quickInfo']>>;

export const PAIR_TOKENS: Record<PairKey, [TokenKey, TokenKey]> = {
  PAIR_AST_APT: ['AST', 'APT'],
  PAIR_AST_WETH: ['AST', 'WETH'],
};

export interface ReservesState {
  t0: Address;
  t1: Address;
  r0: bigint;
  r1: bigint;
  ts: number;
}

export interface PairQuickInfo {
  token0: Address;
  token1: Address;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  myLp: string;
  mySharePct: number;
  myUnderlying0: string;
  myUnderlying1: string;
}

@Injectable()
export class LiquidityService {
  private contracts = inject(ContractsService);
  private wallet = inject(WalletStore);
  private balances = inject(BalancesService);
  private token = inject(Web3TokenService);

  readonly pairs: TPairs[] = [
    { key: 'PAIR_AST_APT', label: 'AST / APT', tokens: ['AST', 'APT'] },
    { key: 'PAIR_AST_WETH', label: 'AST / WETH', tokens: ['AST', 'WETH'] },
  ];
  readonly isLoading = signal(false);
  private TTL_MS = 120_000;
  private cache = new Map<PairKey, ReservesState>();
  private inflight = new Map<PairKey, Promise<ReservesState>>();

  private async getReserves(pairKey: PairKey): Promise<ReservesState> {
    const cached = this.cache.get(pairKey);
    if (cached && Date.now() - cached.ts < this.TTL_MS) return cached;

    const inflight = this.inflight.get(pairKey);
    if (inflight) return inflight;

    const task = (async () => {
      try {
        this.isLoading.set(true);

        const pair = await this.contracts.pairRead(pairKey);
        const [t0, t1, [r0, r1]] = await Promise.all([
          pair.token0() as Promise<Address>,
          pair.token1() as Promise<Address>,
          pair.getReserves() as Promise<[bigint, bigint]>,
        ]);

        const state: ReservesState = { t0, t1, r0, r1, ts: Date.now() };
        this.cache.set(pairKey, state);

        return state;
      } catch (e: any) {
        console.log(e?.message ?? 'Failed to load reserves');
        throw e;
      } finally {
        this.isLoading.set(false);
        this.inflight.delete(pairKey);
      }
    })();

    this.inflight.set(pairKey, task);
    return task;
  }

  async quickInfo(pairKey: PairKey): Promise<PairQuickInfo> {
    const [pair, { t0, t1, r0, r1 }] = await Promise.all([
      this.contracts.pairRead(pairKey),
      this.getReserves(pairKey),
    ]);

    const [ts, me] = await Promise.all([
      pair.totalSupply() as Promise<bigint>,
      (async () => {
        const acc = this.wallet.account();
        return acc ? ((await pair.balanceOf(acc)) as bigint) : 0n;
      })(),
    ]);

    const share = ts > 0n ? Number(me) / Number(ts) : 0;
    const underlying0 = Math.trunc((Number(r0) / 1e18) * share * 1e6) / 1e6;
    const underlying1 = Math.trunc((Number(r1) / 1e18) * share * 1e6) / 1e6;

    return {
      token0: t0,
      token1: t1,
      reserve0: formatToken(r0, 18),
      reserve1: formatToken(r1, 18),
      totalSupply: formatToken(ts, 18),
      myLp: formatToken(me, 18),
      mySharePct: Math.round(share * 10000) / 100,
      myUnderlying0: underlying0.toString(),
      myUnderlying1: underlying1.toString(),
    };
  }

  async quoteAddByRatio(
    pairKey: PairKey,
    tokenA: TokenKey,
    amountAHuman: string
  ): Promise<{ amountAWei: bigint; amountBWei: bigint; amountBHuman: string }> {
    const { t0, r0, r1 } = await this.getReserves(pairKey);

    const a = CONTRACTS[SEPOLIA][tokenA].toLowerCase();
    const isA0 = a === t0.toLowerCase();

    const reserveA = isA0 ? r0 : r1;
    const reserveB = isA0 ? r1 : r0;

    const amountAWei = parseToken(amountAHuman);
    if (amountAWei <= 0n)
      return { amountAWei, amountBWei: 0n, amountBHuman: '0' };

    const amountBWei = reserveA > 0n ? (amountAWei * reserveB) / reserveA : 0n;
    return {
      amountAWei,
      amountBWei,
      amountBHuman: formatToken(amountBWei),
    };
  }

  async addLiquidity(
    pairKey: PairKey,
    tokenA: TokenKey,
    tokenB: TokenKey,
    amountAWei: bigint,
    amountBWei: bigint
  ) {
    const router = await this.contracts.router();
    const addr = CONTRACTS[SEPOLIA];
    const to = this.wallet.account();

    if (!to) throw new Error('Wallet not connected');

    await Promise.all([
      this.token.ensureAllowance(addr[tokenA], addr['ROUTER'], amountAWei),
      this.token.ensureAllowance(addr[tokenB], addr['ROUTER'], amountBWei),
    ]);

    const tx = await router.addLiquidity(
      addr[tokenA],
      addr[tokenB],
      amountAWei,
      amountBWei
    );
    await tx.wait();

    await this.balances.refresh(to);
    this.cache.delete(pairKey);
    await this.getReserves(pairKey);
  }

  async removeLiquidity(pairKey: PairKey, lpAmountWei: bigint) {
    const router = await this.contracts.router();
    const pair = await this.contracts.pairRead(pairKey);
    const to = this.wallet.account();

    if (!to) throw new Error('Wallet not connected');

    const routerAddr = CONTRACTS[SEPOLIA]['ROUTER'];
    const need = (await pair.allowance(to, routerAddr)) as bigint;

    if (need < lpAmountWei) {
      const pairW = await this.contracts.pairWrite(pairKey);
      const txA = await pairW.approve(routerAddr, lpAmountWei);
      await txA.wait();
    }

    const { t0: tokenA, t1: tokenB } = await this.getReserves(pairKey);
    const tx = await router.removeLiquidity(tokenA, tokenB, lpAmountWei);
    await tx.wait();

    await this.balances.refresh(to);
    this.cache.delete(pairKey);
    await this.getReserves(pairKey);
  }
}
