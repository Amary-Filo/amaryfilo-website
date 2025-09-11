import { Component, computed, inject, model, signal } from '@angular/core';
import { UIIconComponent } from '@sandbox/shared/components/icon/icon.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { WalletToolsTabs } from '../../../types';
import { WalletFacade } from '../../../services/wallet-facade.service';

@Component({
  selector: 'sbx-wallet-tools-header-component',
  imports: [UIIconComponent, UIButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class WalletToolsHeaderComponent {
  private facade = inject(WalletFacade);

  readonly account = this.facade.account;
  readonly status = this.facade.status;

  page = model<WalletToolsTabs>('home');
  menuOpen = signal(false);

  shortAddr = computed(() => {
    const a = this.account();
    return a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '';
  });

  connect() {
    this.facade.connect();
  }

  disconnect() {
    this.facade.disconnect();
    this.menuOpen.set(false);
  }

  switchToSepolia() {
    this.facade.switchToSepolia();
  }

  go(p: WalletToolsTabs) {
    this.page.set(p);
  }
}
