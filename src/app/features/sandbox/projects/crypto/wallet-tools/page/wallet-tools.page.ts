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
import { Eip1193Adapter } from '@sandbox/shared/web3/core/adapters/eip1193-adapter.service';
import { WEB3_ADAPTER } from '@sandbox/shared/web3/core/provider-adapter';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { ErrorsService } from '@sandbox/shared/web3/core/errors.service';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { StakingService } from '../services/staking.service';
import { AstService } from '../services/ast.service';

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
    { provide: WEB3_ADAPTER, useClass: Eip1193Adapter },
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
    TxService,
    ErrorsService,
    Web3TokenService,
    StakingService,
    AstService,
  ],
})
export class WalletToolsPage {
  private facade = inject(WalletFacade);
  page = model<WalletToolsTabs>('home');

  ngOnDestroy() {
    this.facade.disconnect();
  }
}
