import { Injectable, inject } from '@angular/core';
import { ContractFactoryService } from '@sandbox/shared/web3/services/contract-factory.service';

@Injectable({ providedIn: 'root' })
export class ContractsService {
  private factory = inject(ContractFactoryService);

  apt() {
    return this.factory.get('APT');
  }

  ast() {
    return this.factory.get('AST');
  }

  auction() {
    return this.factory.get('AUCTION');
  }

  locker() {
    return this.factory.get('LOCKER');
  }

  market() {
    return this.factory.get('MARKET');
  }

  staking() {
    return this.factory.get('STAKING');
  }
}
