import { Injectable, inject } from '@angular/core';
import { ContractsService } from './contracts.service';

@Injectable()
export class AuctionService {
  private c = inject(ContractsService);

  async bid(amountWei: bigint) {
    const auction = await this.c.auction();
    return auction.bid({ value: amountWei });
  }

  async withdraw() {
    const auction = await this.c.auction();
    return auction.withdraw();
  }
}
