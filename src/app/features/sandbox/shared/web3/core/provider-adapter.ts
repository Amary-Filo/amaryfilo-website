import { InjectionToken } from '@angular/core';
import { AllowedWallets } from '@sandbox/shared/utils/tokens';
import { ChainConfig } from '../network-registry.service';

export interface IWeb3Adapter {
  id: AllowedWallets;
  label: string;

  isAvailable(): boolean;
  getProvider(): any | null;

  request<T = any>(method: string, params?: any[]): Promise<T>;
  requestAccounts(): Promise<string[]>;
  chainIdHex(): Promise<string>;
  switchChain(chainIdHex: string): Promise<void>;
  addChain(params: ChainConfig): Promise<void>;
  disconnect?(): Promise<void>;

  onAccountsChanged?(cb: (accs: string[]) => void): void;
  onChainChanged?(cb: (hexChainId: string) => void): void;
  onDisconnect?(cb: (err?: any) => void): void;
}

export const WEB3_ADAPTER = new InjectionToken<IWeb3Adapter>('WEB3_ADAPTER');
