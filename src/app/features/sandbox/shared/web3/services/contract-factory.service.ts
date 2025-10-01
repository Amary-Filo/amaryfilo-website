import { Injectable, inject } from '@angular/core';
import { BrowserProvider, Contract, JsonRpcProvider } from 'ethers';

import type { Web3Config } from '@sandbox/shared/utils/tokens';
import { DEMO_WEB3_CONFIG } from '../tokens';
import { Web3Gateway } from '../core/web3-gateway.service';
import { CHAINS } from '../network-registry.service';

@Injectable()
export class ContractFactoryService {
  private cfg = inject<Web3Config>(DEMO_WEB3_CONFIG);
  private gw = inject(Web3Gateway);

  private getCfg(key: string) {
    const address = this.cfg.contracts?.[key];
    const abi = this.cfg.abis?.[key];

    if (!address || !abi) throw new Error(`Contract "${key}" not configured`);
    return { address, abi };
  }

  private getInjectedProvider(): any {
    const p = this.gw.getAdapter().getProvider();
    if (!p) throw new Error('No EIP-1193 provider (wallet is not connected?)');
    return p;
  }

  async getWrite<T = any>(key: string): Promise<T> {
    const { address, abi } = this.getCfg(key);
    const eth = this.getInjectedProvider();
    const provider = new BrowserProvider(eth);
    const signer = await provider.getSigner();

    return new Contract(address, abi, signer) as unknown as T;
  }

  async getRead<T = any>(key: string): Promise<T> {
    const { address, abi } = this.getCfg(key);
    const eth = this.getInjectedProvider();
    const provider = new BrowserProvider(eth);

    return new Contract(address, abi, provider) as unknown as T;
  }

  getReadPublic<T = any>(
    key: string,
    chainKey: keyof typeof CHAINS = 'sepolia'
  ): T {
    const { address, abi } = this.getCfg(key);
    const rpc = CHAINS[chainKey].rpcUrls[0];

    if (!rpc) throw new Error(`No RPC url for ${chainKey}`);
    const provider = new JsonRpcProvider(rpc);

    return new Contract(address, abi, provider) as unknown as T;
  }
}
