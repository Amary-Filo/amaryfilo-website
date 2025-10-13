import { Injectable, inject, signal } from '@angular/core';

import { ContractsService } from './contracts.service';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { BalancesService } from './balances.service';

import { formatToken, parseToken } from '@sandbox/shared/web3/utils/units';
import {
  CONTRACTS,
  SEPOLIA,
  TokenKey,
  PairKey,
  Address,
} from './contracts/addresses';

export interface QuoteResult {
  amountInWei: bigint;
  amountOutWei: bigint;
  minOutWei: bigint;
  amountOutHuman: string;
  minOutHuman: string;
  priceImpactPct: number;
  feeWei: bigint;
}

export interface ReservesState {
  t0: Address;
  t1: Address;
  r0: bigint;
  r1: bigint;
  ts: number;
}

@Injectable()
export class SwapService {
  private contracts = inject(ContractsService);
  private wallet = inject(WalletStore);
  private balances = inject(BalancesService);
  private token = inject(Web3TokenService);

  readonly tokens: TokenKey[] = ['AST', 'APT', 'WETH'];
  private readonly allowed: Record<TokenKey, TokenKey[]> = {
    AST: ['APT', 'WETH'],
    APT: ['AST'],
    WETH: ['AST'],
  };

  readonly isLoadingReserves = signal<boolean>(false);
  readonly reservesError = signal<string | null>(null);

  private TTL_MS = 120_000;
  private cache = new Map<PairKey, ReservesState>();
  private inflight = new Map<PairKey, Promise<ReservesState>>();

  isDirectionAllowed(tokenIn: TokenKey, tokenOut: TokenKey) {
    return this.allowed[tokenIn]?.includes(tokenOut) ?? false;
  }

  isFresh(pairKey: PairKey) {
    const c = this.cache.get(pairKey);
    return !!c && Date.now() - c.ts < this.TTL_MS;
  }

  private getPairKey(tokenIn: TokenKey, tokenOut: TokenKey): PairKey {
    const a = ['AST', 'APT'];
    const b = ['AST', 'WETH'];
    if (a.includes(tokenIn) && a.includes(tokenOut)) return 'PAIR_AST_APT';
    if (b.includes(tokenIn) && b.includes(tokenOut)) return 'PAIR_AST_WETH';
    throw new Error('Pair not supported');
  }

  private async getReserves(pairKey: PairKey): Promise<ReservesState> {
    const now = Date.now();
    const cached = this.cache.get(pairKey);
    if (cached && now - cached.ts < this.TTL_MS) return cached;

    const pending = this.inflight.get(pairKey);
    if (pending) return pending;

    const p = (async () => {
      try {
        this.isLoadingReserves.set(true);
        this.reservesError.set(null);

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
        const msg = e?.message ?? 'Failed to load reserves';
        this.reservesError.set(msg);
        throw e;
      } finally {
        this.isLoadingReserves.set(false);
        this.inflight.delete(pairKey);
      }
    })();

    this.inflight.set(pairKey, p);
    return p;
  }

  private getAmountOut(
    amountIn: bigint,
    reserveIn: bigint,
    reserveOut: bigint
  ): bigint {
    if (amountIn <= 0n || reserveIn <= 0n || reserveOut <= 0n) return 0n;
    const amountInWithFee = amountIn * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;
    return denominator === 0n ? 0n : numerator / denominator;
  }

  async quoteExactIn(
    tokenIn: TokenKey,
    tokenOut: TokenKey,
    amountInHuman: string,
    slippagePct: number
  ): Promise<QuoteResult> {
    if (!this.isDirectionAllowed(tokenIn, tokenOut)) {
      throw new Error('Direction not allowed');
    }
    const pairKey = this.getPairKey(tokenIn, tokenOut);
    const { t0, r0, r1 } = await this.getReserves(pairKey);

    const addr = CONTRACTS[SEPOLIA];
    const inAddr = addr[tokenIn];

    const reserveIn = inAddr.toLowerCase() === t0.toLowerCase() ? r0 : r1;
    const reserveOut = inAddr.toLowerCase() === t0.toLowerCase() ? r1 : r0;

    const amountInWei = parseToken(amountInHuman);
    if (amountInWei <= 0n) throw new Error('Enter amount');

    const amountOutWei = this.getAmountOut(amountInWei, reserveIn, reserveOut);

    const bps = Math.round(slippagePct * 100);
    const minOutWei = amountOutWei - (amountOutWei * BigInt(bps)) / 10_000n;
    const feeWei = (amountInWei * 3n) / 1000n;

    const rIn = Number(reserveIn) / 1e18;
    const rOut = Number(reserveOut) / 1e18;
    const mid = rIn > 0 ? rOut / rIn : 0;
    const exec = Number(amountOutWei) / 1e18 / (Number(amountInWei) / 1e18);
    const priceImpactPct = mid > 0 ? Math.max(0, (1 - exec / mid) * 100) : 0;

    return {
      amountInWei,
      amountOutWei,
      minOutWei: minOutWei < 0n ? 0n : minOutWei,
      amountOutHuman: formatToken(amountOutWei, 18),
      minOutHuman: formatToken(minOutWei < 0n ? 0n : minOutWei, 18),
      priceImpactPct,
      feeWei,
    };
  }

  async swapExactIn(
    tokenIn: TokenKey,
    tokenOut: TokenKey,
    amountInHuman: string,
    minOutWei: bigint,
    deadlineSec: number
  ) {
    const router = await this.contracts.router();
    const to = this.wallet.account();
    if (!to) throw new Error('Wallet not connected');

    const amountInWei = parseToken(amountInHuman);
    await this.token.ensureAllowance(tokenIn, to, amountInWei);

    const tx = await router.swapExactTokensForTokens(
      CONTRACTS[SEPOLIA][tokenIn],
      CONTRACTS[SEPOLIA][tokenOut],
      amountInWei,
      minOutWei,
      to,
      BigInt(deadlineSec)
    );
    await tx.wait();

    await this.balances.refresh(to);

    const pairKey = this.getPairKey(tokenIn, tokenOut);
    this.cache.delete(pairKey);
    this.getReserves(pairKey).catch(() => {});
  }
}
