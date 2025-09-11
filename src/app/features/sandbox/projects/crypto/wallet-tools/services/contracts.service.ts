import { Injectable } from '@angular/core';
import { BaseContractsService } from '@sandbox/shared/web3/services/base-contract.service';

@Injectable()
export class ContractsService extends BaseContractsService {
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
