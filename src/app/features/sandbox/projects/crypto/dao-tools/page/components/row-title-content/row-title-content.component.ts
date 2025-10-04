import { Component, inject, input } from '@angular/core';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { ConnectWalletTextComponent } from '../connect-wallet-text/connect-wallet-text.component';

@Component({
  selector: 'sbx-row-title-content',
  templateUrl: './row-title-content.component.html',
  styleUrl: './row-title-content.component.scss',
  standalone: true,
  imports: [ConnectWalletTextComponent],
})
export class RowTitleContentComponent {
  title = input<string>();
  text = input<string>();
  useStatus = input<boolean>(true);
  connectText = input<string>();

  private facade = inject(WalletFacade);
  readonly status = this.facade.status;
}
