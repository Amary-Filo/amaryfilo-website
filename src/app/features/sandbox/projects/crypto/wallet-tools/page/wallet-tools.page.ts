import { Component, inject, WritableSignal, model } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DEMO_WEB3_CONFIG } from '@sandbox/shared/web3/tokens';
import { DEMO_CONFIG, Web3Config } from '@sandbox/shared/utils/tokens';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { ContractsService } from '../services/contracts.service';
import { ContractFactoryService } from '@sandbox/shared/web3/services/contract-factory.service';
import { WalletToolsHeaderComponent } from './components/header/header.component';
import { WalletToolsTabs } from '../types';
import { WalletToolsAuctionComponent } from './components/auction/auction.component';
import { WalletToolsHomeComponent } from './components/home/home.component';
import { WalletToolsStakingComponent } from './components/staking/staking.component';
import { WalletToolsMarketplaceComponent } from './components/marketplace/marketplace.component';
import { Web3Orchestrator } from '../services/web3-orchestrator.service';
import { BalancesService } from '../services/balances.service';
import { BaseContractsService } from '@sandbox/shared/web3/services/base-contract.service';
import { WalletFacade } from '../services/wallet-facade.service';
import { AuctionService } from '../services/auction.service';

@Component({
  standalone: true,
  selector: 'sbx-wallet-tools',
  imports: [
    CommonModule,
    WalletToolsHeaderComponent,
    WalletToolsHomeComponent,
    WalletToolsStakingComponent,
    WalletToolsAuctionComponent,
    WalletToolsMarketplaceComponent,
  ],
  templateUrl: './wallet-tools.page.html',
  styleUrls: ['./wallet-tools.page.scss'],
  providers: [
    {
      provide: DEMO_WEB3_CONFIG,
      deps: [DEMO_CONFIG],
      useFactory: (cfgSig: WritableSignal<any> | null): Web3Config => {
        const cfg = cfgSig?.() ?? {};
        return (
          cfg.web3 ?? {
            allowedChains: [11155111],
            allowedWallets: ['injected'],
            contracts: {},
            abis: {},
          }
        );
      },
    },
    WalletFacade,
    WalletStore,
    BaseContractsService,
    ContractFactoryService,
    ContractsService,
    Web3Orchestrator,
    BalancesService,
    AuctionService,
  ],
})
export class WalletToolsPage {
  private facade = inject(WalletFacade);
  page = model<WalletToolsTabs>('home');

  ngOnDestroy() {
    this.facade.disconnect();
  }

  // async faucetAST() {
  //   await (await this.contracts.ast()).faucetClaim();
  //   await this.refresh();
  // }

  // async lockAPT1() {
  //   const acc = this.account();
  //   if (!acc) return;
  //   const apt = await this.contracts.apt();
  //   const locker = await this.contracts.locker();
  //   await apt.approve(locker.target, 10n ** 18n);
  //   await locker.start(10n ** 18n);
  //   await this.refresh();
  // }
}
