import { Component, inject, input } from '@angular/core';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { WalletToolsConnectWalletTextComponent } from '../connect-wallet-text/connect-wallet-text.component';

@Component({
  selector: 'sbx-wallet-tools-row-title-content',
  templateUrl: './row-title-content.component.html',
  styleUrl: './row-title-content.component.scss',
  standalone: true,
  imports: [WalletToolsConnectWalletTextComponent],
})
export class WalletToolsRowTitleContentComponent {
  title = input<string>();
  text = input<string>();
  useStatus = input<boolean>(true);
  connectText = input<string>();

  private facade = inject(WalletFacade);
  readonly status = this.facade.status;
}
