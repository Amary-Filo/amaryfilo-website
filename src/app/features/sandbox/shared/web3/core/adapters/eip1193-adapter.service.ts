import { Injectable, inject } from '@angular/core';
import { IWeb3Adapter } from '../provider-adapter';
import { ProviderService } from '../provider.service';

@Injectable()
export class Eip1193Adapter implements IWeb3Adapter {
  private p = inject(ProviderService);

  getProvider() {
    return this.p.ethereum;
  }

  request<T>(method: string, params?: any[]) {
    return this.p.request<T>(method, params);
  }

  requestAccounts() {
    return this.p.requestAccounts();
  }

  chainIdHex() {
    return this.p.chainIdHex();
  }

  switchChain(chainIdHex: string) {
    return this.p.switchChain(chainIdHex);
  }

  addChain(params: any) {
    return this.p.addChain(params);
  }
}
