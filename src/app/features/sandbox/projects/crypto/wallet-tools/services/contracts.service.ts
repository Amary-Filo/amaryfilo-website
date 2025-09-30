import { Injectable } from '@angular/core';
import { BaseContractsService } from '@sandbox/shared/web3/services/base-contract.service';

@Injectable()
export class ContractsService extends BaseContractsService {
  aptRead() {
    return this.factory.getRead('APT');
  }
  astRead() {
    return this.factory.getRead('AST');
  }
  auctionRead() {
    return this.factory.getRead('AUCTION');
  }
  stakingRead() {
    return this.factory.getRead('STAKING');
  }
  marketRead() {
    return this.factory.getRead('MARKET');
  }

  apt() {
    return this.factory.getWrite('APT');
  }
  ast() {
    return this.factory.getWrite('AST');
  }
  auction() {
    return this.factory.getWrite('AUCTION');
  }
  staking() {
    return this.factory.getWrite('STAKING');
  }
  market() {
    return this.factory.getWrite('MARKET');
  }
}
