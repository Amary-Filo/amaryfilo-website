import { Injectable, inject } from '@angular/core';
import { ContractsService } from './contracts.service';

@Injectable()
export class StakingService {
  private c = inject(ContractsService);

  async stake(amountWei: bigint) {
    const staking = await this.c.staking();
    return staking.stake(amountWei);
  }

  async withdrawStake() {
    const staking = await this.c.staking();
    return staking.withdraw();
  }

  async claim() {
    const staking = await this.c.staking();
    return staking.claim();
  }
}
