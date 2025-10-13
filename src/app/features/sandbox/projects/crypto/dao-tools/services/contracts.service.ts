import { Injectable } from '@angular/core';
import { BaseContractsService } from '@sandbox/shared/web3/services/base-contract.service';
import { PairKey, TokenKey } from './contracts/addresses';

@Injectable()
export class ContractsService extends BaseContractsService {
  erc20Read(key: TokenKey) {
    return this.factory.getRead(key);
  }
  erc20Write(key: TokenKey) {
    return this.factory.getWrite(key);
  }

  pairRead(key: PairKey) {
    return this.factory.getRead(key);
  }
  pairWrite(key: PairKey) {
    return this.factory.getWrite(key);
  }

  router() {
    return this.factory.getWrite('ROUTER');
  }
  farm() {
    return this.factory.getWrite('FARM');
  }
  farmRead() {
    return this.factory.getRead('FARM');
  }
}
