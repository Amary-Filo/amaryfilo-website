import { Component, inject, model } from '@angular/core';
import { parseToken } from '@sandbox/shared/web3/utils/units';
import { AuctionService } from '../../../services/auction.service';

@Component({
  selector: 'sbx-wallet-tools-auction-tab',
  imports: [],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss',
  standalone: true,
})
export class WalletToolsAuctionComponent {
  private auction = inject(AuctionService);
  amount = model<string>('');

  async bid() {
    await this.auction.bid(parseToken(this.amount(), 18));
  }

  async withdraw() {
    await this.auction.withdraw();
  }
}
