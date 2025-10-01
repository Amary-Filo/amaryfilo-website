import { Component, inject, model, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BaseDemoConfig,
  DEMO_CONFIG,
  Web3Config,
} from '@sandbox/shared/utils/tokens';
import { DEMO_WEB3_CONFIG } from '@sandbox/shared/web3/tokens';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3Gateway } from '@sandbox/shared/web3/core/web3-gateway.service';
import { Eip1193Adapter } from '@sandbox/shared/web3/core/adapters/eip1193-adapter.service';
import { WalletConnectAdapter } from '@sandbox/shared/web3/core/adapters/walletconnect-adapter.service';

import { WalletFacade } from '../services/wallet-facade.service';

import { WalletToolsTabs } from '../types';

import { ErrorsService } from '@sandbox/shared/web3/core/errors.service';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { BaseContractsService } from '@sandbox/shared/web3/services/base-contract.service';
import { ContractFactoryService } from '@sandbox/shared/web3/services/contract-factory.service';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { AstService } from '../services/ast.service';
import { AuctionService } from '../services/auction.service';
import { BalancesService } from '../services/balances.service';
import { ContractsService } from '../services/contracts.service';
import { MarketService } from '../services/marketplace.service';
import { StakingService } from '../services/staking.service';
import { Web3Orchestrator } from '../services/web3-orchestrator.service';

import { WalletToolsHeaderComponent } from './components/header/header.component';
import { WalletToolsAuctionComponent } from './components/auction/auction.component';
import { WalletToolsHomeComponent } from './components/home/home.component';
import { WalletToolsStakingComponent } from './components/staking/staking.component';
import { WalletToolsMarketplaceComponent } from './components/marketplace/marketplace.component';
import { WalletToolsFooterComponent } from './components/footer/footer.component';
import { WalletToolsAboutComponent } from './components/about/about.component';

@Component({
  standalone: true,
  selector: 'sbx-wallet-tools',
  imports: [
    CommonModule,
    WalletToolsHeaderComponent,
    CommonModule,
    WalletToolsHeaderComponent,
    WalletToolsHomeComponent,
    WalletToolsStakingComponent,
    WalletToolsAuctionComponent,
    WalletToolsMarketplaceComponent,
    WalletToolsFooterComponent,
    WalletToolsAboutComponent,
  ],
  templateUrl: './wallet-tools.page.html',
  styleUrls: ['./wallet-tools.page.scss'],
  providers: [
    {
      provide: DEMO_WEB3_CONFIG,
      deps: [DEMO_CONFIG],
      useFactory: (cfgOrSig: WritableSignal<BaseDemoConfig>): Web3Config => {
        if (cfgOrSig().web3) return cfgOrSig().web3 as Web3Config;
        throw new Error('web3 config is missing in Manifest/BaseDemoConfig');
      },
    },
    Web3Gateway,
    WalletStore,
    Eip1193Adapter,
    WalletConnectAdapter,

    BaseContractsService,

    WalletFacade,
    ContractFactoryService,
    Web3TokenService,
    Web3Orchestrator,

    ErrorsService,
    TxService,
    ContractsService,

    BalancesService,
    StakingService,
    AstService,
    AuctionService,
    MarketService,
  ],
})
export class WalletToolsPage {
  private facade = inject(WalletFacade);
  page = model<WalletToolsTabs>('home');

  ngOnDestroy() {
    this.facade.disconnect();
  }
}
