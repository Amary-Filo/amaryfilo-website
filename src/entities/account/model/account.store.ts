// src/entities/account/model/account.store.ts

import { Injectable, computed, signal } from '@angular/core';
import type { Address } from 'viem';

import type { AccountStatus } from './account.types';

@Injectable()
export class AccountStore {
  private readonly statusSignal = signal<AccountStatus>('disconnected');
  private readonly addressSignal = signal<Address | null>(null);
  private readonly chainIdSignal = signal<number | null>(null);
  private readonly errorSignal = signal<string | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly address = this.addressSignal.asReadonly();
  readonly chainId = this.chainIdSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly isConnected = computed(() => !!this.addressSignal());
  readonly isDisconnected = computed(() => !this.addressSignal());

  setConnecting(): void {
    this.statusSignal.set('connecting');
    this.errorSignal.set(null);
  }

  setConnected(address: Address, chainId: number): void {
    this.addressSignal.set(address);
    this.chainIdSignal.set(chainId);
    this.statusSignal.set('connected');
    this.errorSignal.set(null);
  }

  setWrongNetwork(address: Address | null, chainId: number): void {
    this.addressSignal.set(address);
    this.chainIdSignal.set(chainId);
    this.statusSignal.set('wrong_network');
    this.errorSignal.set(null);
  }

  setDisconnected(): void {
    this.addressSignal.set(null);
    this.chainIdSignal.set(null);
    this.statusSignal.set('disconnected');
    this.errorSignal.set(null);
  }

  setError(message: string): void {
    this.statusSignal.set('error');
    this.errorSignal.set(message);
  }
}
