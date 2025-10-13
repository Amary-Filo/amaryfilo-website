import { Injectable, inject, signal } from '@angular/core';
import { ContractsService } from './contracts.service';
import { TokenKey } from './contracts/addresses';
import { formatToken } from '@sandbox/shared/web3/utils/units';

export type TTokenBalance = {
  balance: bigint;
  formatted: string;
};

export type TPairBalance = {
  balance: bigint;
  formatted: string;
  share: number;
  price: number;
};

@Injectable()
export class BalancesService {
  private contracts = inject(ContractsService);

  isLoading = signal(true);

  tokenAst = signal<TTokenBalance>({ balance: 0n, formatted: '0' });
  tokenApt = signal<TTokenBalance>({ balance: 0n, formatted: '0' });
  tokenWeth = signal<TTokenBalance>({
    balance: 0n,
    formatted: '0',
  });

  pairAstApt = signal<TPairBalance>({
    balance: 0n,
    formatted: '0',
    share: 0,
    price: 0,
  });

  pairAstWeth = signal<TPairBalance>({
    balance: 0n,
    formatted: '0',
    share: 0,
    price: 0,
  });

  getTokenBalance(key: TokenKey): TTokenBalance {
    const tokens: Record<TokenKey, TTokenBalance> = {
      APT: this.tokenApt(),
      AST: this.tokenAst(),
      WETH: this.tokenWeth(),
    };

    return tokens[key];
  }

  async refresh(account: string) {
    this.isLoading.set(true);
    const [ast, apt, weth] = await Promise.all([
      this.contracts.erc20Read('AST'),
      this.contracts.erc20Read('APT'),
      this.contracts.erc20Read('WETH'),
    ]);

    const [astBal, aptBal, wethBal] = await Promise.all([
      ast.balanceOf(account),
      apt.balanceOf(account),
      weth.balanceOf(account),
    ]);

    this.tokenAst.set({
      balance: astBal,
      formatted: formatToken(astBal, 18),
    });
    this.tokenApt.set({
      balance: aptBal,
      formatted: formatToken(aptBal, 18),
    });
    this.tokenWeth.set({
      balance: wethBal,
      formatted: formatToken(wethBal, 18),
    });

    const [pairAstApt, pairAstWeth] = await Promise.all([
      this.contracts.pairRead('PAIR_AST_APT'),
      this.contracts.pairRead('PAIR_AST_WETH'),
    ]);

    const [[t0a, t1a, [r0a, r1a], tsa, myA], [t0w, t1w, [r0w, r1w], tsw, myW]] =
      await Promise.all([
        Promise.all([
          pairAstApt.token0(),
          pairAstApt.token1(),
          pairAstApt.getReserves(),
          pairAstApt.totalSupply(),
          pairAstApt.balanceOf(account),
        ]),
        Promise.all([
          pairAstWeth.token0(),
          pairAstWeth.token1(),
          pairAstWeth.getReserves(),
          pairAstWeth.totalSupply(),
          pairAstWeth.balanceOf(account),
        ]),
      ]);

    const shareAstApt = tsa > 0n ? Number(myA) / Number(tsa) : 0;
    const shareAstWeth = tsw > 0n ? Number(myW) / Number(tsw) : 0;

    const priceAstApt =
      Number(r0a) > 0 && Number(r1a) > 0 ? Number(r1a) / Number(r0a) : 0;
    const priceAstWeth =
      Number(r0w) > 0 && Number(r1w) > 0 ? Number(r1w) / Number(r0w) : 0;

    this.pairAstApt.set({
      balance: myA,
      formatted: formatToken(myA, 18),
      share: shareAstApt,
      price: priceAstApt,
    });

    this.pairAstWeth.set({
      balance: myW,
      formatted: formatToken(myW, 18),
      share: shareAstWeth,
      price: priceAstWeth,
    });

    this.isLoading.set(false);
  }

  setDefault() {
    this.tokenAst.set({
      balance: 0n,
      formatted: '0',
    });
    this.tokenApt.set({
      balance: 0n,
      formatted: '0',
    });
    this.tokenWeth.set({
      balance: 0n,
      formatted: '0',
    });

    this.pairAstApt.set({
      balance: 0n,
      formatted: '0',
      share: 0,
      price: 0,
    });

    this.pairAstWeth.set({
      balance: 0n,
      formatted: '0',
      share: 0,
      price: 0,
    });
  }
}
