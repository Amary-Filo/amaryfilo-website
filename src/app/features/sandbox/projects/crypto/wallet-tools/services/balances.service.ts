import { Injectable, inject, signal } from '@angular/core';
import { ContractsService } from './contracts.service';

@Injectable()
export class BalancesService {
  private contracts = inject(ContractsService);
  ast = signal<bigint>(0n);
  apt = signal<bigint>(0n);

  async refresh(account: string) {
    try {
      const [ast, apt] = await Promise.all([
        (await this.contracts.ast()).balanceOf(account),
        (await this.contracts.apt()).balanceOf(account),
      ]);
      this.ast.set(ast);
      this.apt.set(apt);
    } catch {
      this.ast.set(0n);
      this.apt.set(0n);
    }
  }
}
