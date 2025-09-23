import { Injectable, inject } from '@angular/core';
import { ContractsService } from './contracts.service';

@Injectable()
export class AstService {
  private c = inject(ContractsService);

  async faucetClaim() {
    const ast = await this.c.ast();
    const tx = await ast.faucetClaim();
    return tx.wait?.();
  }
}
