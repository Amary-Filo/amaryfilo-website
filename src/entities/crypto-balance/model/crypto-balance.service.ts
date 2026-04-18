// src/entities/crypto-balance/model/crypto-balance.service.ts

import { Injectable, signal } from '@angular/core';
import { getBalance, readContracts } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';
import type { CryptoBalanceItem, CryptoBalanceLoadParams } from './crypto-balance.types';
import { toBalanceItem } from './crypto-balance.utils';

@Injectable()
export class CryptoBalanceService {
  private readonly isLoadingSignal = signal(false);
  private readonly itemsSignal = signal<CryptoBalanceItem[]>([]);
  private readonly errorSignal = signal<string | null>(null);

  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly items = this.itemsSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  async load(params: CryptoBalanceLoadParams): Promise<void> {
    const { account, chainId, nativeToken, tokens } = params;
    const appChainId = asAppChainId(chainId);

    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const nativeRes = await getBalance(wagmiConfig, {
        address: account,
        chainId: appChainId,
      });

      const nativeItem = toBalanceItem({
        descriptor: nativeToken,
        wei: nativeRes.value,
      });

      let tokenItems: CryptoBalanceItem[] = [];

      if (tokens.length) {
        const tokenResults = await readContracts(wagmiConfig, {
          allowFailure: true,
          contracts: tokens.map((token) => ({
            address: token.address,
            abi: token.abi,
            functionName: 'balanceOf',
            args: [account] as const,
            chainId: appChainId,
          })),
        });

        tokenItems = tokenResults.flatMap((result, index) => {
          const token = tokens[index];
          if (result.status !== 'success') return [];

          return [
            toBalanceItem({
              descriptor: token,
              wei: result.result as bigint,
            }),
          ];
        });
      }

      this.itemsSignal.set([nativeItem, ...tokenItems]);
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to load balances');
      this.itemsSignal.set([]);
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  reset(): void {
    this.itemsSignal.set([]);
    this.errorSignal.set(null);
    this.isLoadingSignal.set(false);
  }
}
