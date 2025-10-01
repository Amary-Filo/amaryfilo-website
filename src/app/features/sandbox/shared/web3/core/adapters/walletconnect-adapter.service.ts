import { Injectable } from '@angular/core';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { IWeb3Adapter } from '../provider-adapter';
import {
  AllowedWallets,
  AdapterOptions,
  Web3Config,
} from '@sandbox/shared/utils/tokens';
import { rpcMapFromChains } from '../../network-registry.service';

function toHexChainId(v: any): string {
  if (typeof v === 'number') return '0x' + v.toString(16);
  if (typeof v === 'string') {
    const s = v.toLowerCase();
    if (s.startsWith('0x')) return s;
    if (s.startsWith('eip155:')) {
      const n = Number(s.split(':')[1]);
      if (!Number.isNaN(n)) return '0x' + n.toString(16);
    }
    const n = Number(s);
    if (!Number.isNaN(n)) return '0x' + n.toString(16);
  }
  return '0x0';
}

@Injectable()
export class WalletConnectAdapter implements IWeb3Adapter {
  id: AllowedWallets = 'walletconnect';
  label = 'WalletConnect';

  private provider: any | null = null;
  private cfg?: Web3Config;
  private wcOptions?: AdapterOptions['walletconnect'];

  configure(opts: {
    web3: Web3Config;
    options?: AdapterOptions['walletconnect'];
  }) {
    this.cfg = opts.web3;
    this.wcOptions = opts.options;
  }

  isAvailable() {
    return true;
  }
  getProvider() {
    return this.provider;
  }

  private async ensureProvider() {
    if (this.provider) return;
    if (!this.cfg) throw new Error('WalletConnect not configured');

    const wc = this.wcOptions;
    if (!wc?.projectId) throw new Error('walletconnect.projectId is required');

    const chains = this.cfg.allowedChains;
    if (!chains?.length) throw new Error('allowedChains are empty');

    const rpcMap = rpcMapFromChains(chains);
    const optionalChains = [chains[0], ...chains.slice(1)] as [
      number,
      ...number[]
    ];

    this.provider = await EthereumProvider.init({
      projectId: wc.projectId,
      chains,
      optionalChains,
      rpcMap,
      showQrModal: wc.showQrModal ?? true,
      metadata: wc.metadata,

      methods: [
        'eth_requestAccounts',
        'eth_chainId',
        'eth_sendTransaction',
        'eth_sign',
        'personal_sign',
        'wallet_switchEthereumChain',
        'wallet_addEthereumChain',
      ],
      events: [
        'connect',
        'disconnect',
        'accountsChanged',
        'chainChanged',
        'message',
        'session_update',
      ],
      optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4'],
      optionalEvents: ['session_event'],
    });

    this.provider.on('chainChanged', (raw: any) => {
      const hex = toHexChainId(raw);
      if (hex === '0x0') return;

      this._onChain?.(hex);
    });

    this.provider.on('accountsChanged', (a: string[]) => this._onAccounts?.(a));
    this.provider.on('disconnect', (e: any) => this._onDisconnect?.(e));
  }

  private async connectSession() {
    await this.ensureProvider();
    const hasAccounts =
      Array.isArray(this.provider?.accounts) &&
      this.provider.accounts.length > 0;

    if (!hasAccounts) {
      await this.provider.connect();
    }
  }

  async request<T>(method: string, params?: any[]) {
    await this.connectSession();
    return this.provider.request({ method, params }) as Promise<T>;
  }

  async requestAccounts(): Promise<string[]> {
    await this.connectSession();
    return (await this.provider.request({
      method: 'eth_requestAccounts',
    })) as string[];
  }

  async chainIdHex(): Promise<string> {
    await this.connectSession();
    const raw = await this.provider.request({ method: 'eth_chainId' });
    return toHexChainId(raw);
  }

  async switchChain(chainIdHex: string) {
    await this.connectSession();
    await this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  }

  async addChain(params: any) {
    await this.connectSession();
    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [params],
    });
  }

  async disconnect() {
    try {
      await this.provider?.disconnect?.();
    } catch {}
    this.provider = null;
  }

  private _onAccounts?: (a: string[]) => void;
  private _onChain?: (hex: string) => void;
  private _onDisconnect?: (e?: any) => void;
  onAccountsChanged(cb: (a: string[]) => void) {
    this._onAccounts = cb;
  }
  onChainChanged(cb: (hex: string) => void) {
    this._onChain = cb;
  }
  onDisconnect(cb: (e?: any) => void) {
    this._onDisconnect = cb;
  }
}
