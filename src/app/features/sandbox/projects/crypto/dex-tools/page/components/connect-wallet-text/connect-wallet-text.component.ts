import { Component, input } from '@angular/core';

@Component({
  selector: 'sbx-connect-wallet-text',
  templateUrl: './connect-wallet-text.component.html',
  styleUrl: './connect-wallet-text.component.scss',
  standalone: true,
})
export class ConnectWalletTextComponent {
  connectText = input<string | undefined>();
}
