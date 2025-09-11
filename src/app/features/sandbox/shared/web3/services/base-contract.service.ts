import { Injectable, inject } from '@angular/core';
import { Web3Config } from '@sandbox/shared/utils/tokens';
import { ContractFactoryService } from '@sandbox/shared/web3/services/contract-factory.service';
import { DEMO_WEB3_CONFIG } from '@sandbox/shared/web3/tokens';

@Injectable()
export class BaseContractsService {
  protected factory = inject(ContractFactoryService);
  private cfg = inject<Web3Config>(DEMO_WEB3_CONFIG);

  getAddress(key: keyof Web3Config['contracts']) {
    return this.cfg.contracts?.[key] ?? null;
  }

  getAllAddresses() {
    return { ...(this.cfg.contracts ?? {}) };
  }
}
