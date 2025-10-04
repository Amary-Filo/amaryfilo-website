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

  apt() {
    return this.factory.getWrite('APT');
  }
  ast() {
    return this.factory.getWrite('AST');
  }
}
