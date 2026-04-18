// src/entities/crypto-balance/crypto-balance.facade.ts

import { Injectable, computed, inject } from '@angular/core';
import { zeroAddress } from 'viem';

import type { DemoContractDescriptor } from '@lib/web3/contracts/contract.types';
import { AccountFacade } from '@entities';
import { CryptoBalanceService } from './model/crypto-balance.service';

@Injectable()
export class CryptoBalanceFacade {
  private readonly service = inject(CryptoBalanceService);
  private readonly account = inject(AccountFacade);

  readonly isLoading = this.service.isLoading;
  readonly items = this.service.items;
  readonly error = this.service.error;

  readonly hasItems = computed(() => this.items().length > 0);

  async load(params: {
    requiredChainId: number;
    nativeTokenLabel: string;
    nativeTokenSymbol: string;
    nativeTokenDecimals: number;
    tokens: DemoContractDescriptor[];
  }): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId || chainId !== params.requiredChainId) {
      this.service.reset();
      return;
    }

    const nativeToken: DemoContractDescriptor = {
      key: 'TOKEN_NATIVE',
      label: params.nativeTokenLabel,
      address: zeroAddress,
      abi: [],
      kind: 'token',
      tokenMeta: {
        symbol: params.nativeTokenSymbol,
        name: params.nativeTokenLabel,
        decimals: params.nativeTokenDecimals,
        isNative: true,
      },
    };

    await this.service.load({
      account: address,
      chainId,
      nativeToken,
      tokens: params.tokens,
    });
  }

  reset(): void {
    this.service.reset();
  }
}
