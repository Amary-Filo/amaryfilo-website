import { Inject, Injectable } from '@angular/core';
import { ProviderService } from '../core/provider.service';
import { DEMO_WEB3_CONFIG } from '../tokens';
import type { Web3Config } from '@sandbox/shared/utils/tokens';

@Injectable({ providedIn: 'root' })
export class ContractFactoryService {
  constructor(
    private p: ProviderService,
    @Inject(DEMO_WEB3_CONFIG) private cfg: Web3Config
  ) {}

  async get<T = any>(key: string): Promise<T> {
    if (!this.cfg) throw new Error('No DEMO_WEB3_CONFIG');

    const address = this.cfg.contracts?.[key];
    const abi = this.cfg.abis?.[key];
    if (!address || !abi) {
      throw new Error(`Contract "${key}" not configured`);
    }

    const eth = this.p.ethereum;
    if (!eth) throw new Error('No EIP-1193 provider');

    const { BrowserProvider, Contract } = await import('ethers');
    const provider = new BrowserProvider(eth);
    const signer = await provider.getSigner();
    return new Contract(address, abi, signer) as unknown as T;
  }
}
