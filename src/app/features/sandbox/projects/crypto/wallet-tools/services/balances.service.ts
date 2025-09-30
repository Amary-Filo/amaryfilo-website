import { Injectable, computed, inject, signal } from '@angular/core';
import { ContractsService } from './contracts.service';
import { formatToken } from '@sandbox/shared/web3/utils/units';

@Injectable()
export class BalancesService {
  private contracts = inject(ContractsService);
  ast = signal<bigint>(0n);
  apt = signal<bigint>(0n);
  isLoading = signal<boolean>(true);

  formatAst = computed(() => formatToken(this.ast(), 18));
  formatApt = computed(() => formatToken(this.apt(), 18));

  async refresh(account: string) {
    try {
      const [ast, apt] = await Promise.all([
        (await this.contracts.ast()).balanceOf(account),
        (await this.contracts.apt()).balanceOf(account),
      ]);

      this.ast.set(ast);
      this.apt.set(apt);

      this.isLoading.set(false);
    } catch {
      this.ast.set(0n);
      this.apt.set(0n);
    }
  }
}
