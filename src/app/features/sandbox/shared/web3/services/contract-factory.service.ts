import { Inject, Injectable } from '@angular/core';
import { BrowserProvider, Contract } from 'ethers';

import type { Web3Config } from '@sandbox/shared/utils/tokens';
import { DEMO_WEB3_CONFIG } from '../tokens';
import { IWeb3Adapter, WEB3_ADAPTER } from '../core/provider-adapter';

@Injectable()
export class ContractFactoryService {
  constructor(
    @Inject(DEMO_WEB3_CONFIG) private cfg: Web3Config,
    @Inject(WEB3_ADAPTER) private adapter: IWeb3Adapter
  ) {}

  private getCfg(key: string) {
    const address = this.cfg.contracts?.[key];
    const abi = this.cfg.abis?.[key];
    if (!address || !abi) throw new Error(`Contract "${key}" not configured`);
    return { address, abi };
  }

  async getWrite<T = any>(key: string): Promise<T> {
    const { address, abi } = this.getCfg(key);
    const eth = this.adapter.getProvider();
    if (!eth) throw new Error('No EIP-1193 provider');

    const provider = new BrowserProvider(eth);
    const signer = await provider.getSigner();
    return new Contract(address, abi, signer) as unknown as T;
  }

  async getRead<T = any>(key: string): Promise<T> {
    const { address, abi } = this.getCfg(key);
    const eth = this.adapter.getProvider();
    if (!eth) throw new Error('No EIP-1193 provider');

    const provider = new BrowserProvider(eth);
    return new Contract(address, abi, provider) as unknown as T;
  }
}
