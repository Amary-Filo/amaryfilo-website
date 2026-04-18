// src/entities/account/account.facade.ts

import { DestroyRef, Injectable, computed, inject } from '@angular/core';
import {
  connect,
  disconnect,
  getConnection,
  getConnections,
  switchChain,
  watchConnection,
  watchChainId,
} from '@wagmi/core';
import type { Address } from 'viem';

import {
  wagmiConfig,
  walletConnectConnector,
  asAppChainId,
  injectRequiredChainId,
} from '@lib/web3';
import { AccountStore } from './model/account.store';

@Injectable()
export class AccountFacade {
  private readonly store = inject(AccountStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly status = this.store.status;
  readonly address = this.store.address;
  readonly chainId = this.store.chainId;
  readonly error = this.store.error;
  readonly isConnected = this.store.isConnected;

  private readonly requiredChainIdSignal = injectRequiredChainId();

  readonly isWrongNetwork = computed(() => {
    const chainId = this.chainId();
    const requiredChainId = this.requiredChainIdSignal();
    return !!chainId && chainId !== requiredChainId;
  });

  readonly canUseDemo = computed(() => this.isConnected() && !this.isWrongNetwork());

  constructor() {
    this.hydrateFromWallet();
    this.watchWallet();
  }

  async connectWallet(): Promise<void> {
    try {
      this.store.setConnecting();

      await connect(wagmiConfig, {
        connector: walletConnectConnector,
      });

      this.syncFromAccount();

      if (this.isWrongNetwork()) {
        await this.switchToRequiredNetwork();
      }
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Wallet connection failed');
    }
  }

  async disconnect(): Promise<void> {
    try {
      const connections = getConnections(wagmiConfig);

      for (const connection of connections) {
        if (typeof connection.connector.disconnect === 'function') {
          await disconnect(wagmiConfig, { connector: connection.connector });
        }
      }

      this.store.setDisconnected();
    } catch {
      this.store.setDisconnected();
    }
  }

  async switchToRequiredNetwork(): Promise<void> {
    try {
      await switchChain(wagmiConfig, {
        chainId: asAppChainId(this.requiredChainIdSignal()),
      });

      this.syncFromAccount();
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Network switch failed');
    }
  }

  private hydrateFromWallet(): void {
    this.syncFromAccount();
  }

  private watchWallet(): void {
    const unwatchAccount = watchConnection(wagmiConfig, {
      onChange: () => {
        this.syncFromAccount();
      },
    });

    const unwatchChainId = watchChainId(wagmiConfig, {
      onChange: () => {
        this.syncFromAccount();
      },
    });

    this.destroyRef.onDestroy(() => {
      unwatchAccount?.();
      unwatchChainId?.();
    });
  }

  private syncFromAccount(): void {
    const account = getConnection(wagmiConfig);

    if (!account.address || !account.chainId) {
      this.store.setDisconnected();
      return;
    }

    const address = account.address as Address;
    const chainId = account.chainId;
    const requiredChainId = this.requiredChainIdSignal();

    if (chainId !== requiredChainId) {
      this.store.setWrongNetwork(address, chainId);
      return;
    }

    this.store.setConnected(address, chainId);
  }
}
