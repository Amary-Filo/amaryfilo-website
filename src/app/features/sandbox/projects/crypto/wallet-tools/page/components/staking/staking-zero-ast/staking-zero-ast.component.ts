import { Component, inject, signal } from '@angular/core';

import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { AstService } from '@sandbox/projects/crypto/wallet-tools/services/ast.service';

import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

@Component({
  selector: 'ui-staking-zero-ast',
  templateUrl: './staking-zero-ast.component.html',
  styleUrl: './staking-zero-ast.component.scss',
  imports: [UIButtonComponent],
  standalone: true,
})
export class UIStakingZeroAstComponent {
  private astService = inject(AstService);
  private tx = inject(TxService);

  readonly faucetInProgress = signal<boolean>(false);
  readonly isFaucetCooldown = signal<boolean>(false);

  async faucetClaim() {
    if (this.faucetInProgress()) return;

    this.faucetInProgress.set(true);

    await this.tx.send(() => this.astService.faucetClaim(), {
      onSuccess: () => this.faucetInProgress.set(false),
      onError: (e) => {
        if (
          e.error?.code === 3 ||
          e.error?.message === 'execution reverted: "Cooldown"' ||
          e.error?.revertReason === 'Cooldown'
        ) {
          this.isFaucetCooldown.set(true);
        }
        this.faucetInProgress.set(false);
      },
    });
  }

  openLink(link: string) {
    window.open(link, '_blank', 'noopener');
  }
}
