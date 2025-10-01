import { Component, input } from '@angular/core';

@Component({
  selector: 'sbx-wallet-tools-connect-wallet-text',
  templateUrl: './connect-wallet-text.component.html',
  styleUrl: './connect-wallet-text.component.scss',
  standalone: true,
})
export class WalletToolsConnectWalletTextComponent {
  connectText = input<string | undefined>();
}
