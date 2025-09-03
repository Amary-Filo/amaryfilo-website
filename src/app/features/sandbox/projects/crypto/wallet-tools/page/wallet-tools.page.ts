import {
  Component,
  inject,
  signal,
  computed,
  effect,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CHAINS } from '@sandbox/shared/web3/network-registry.service';

import { DEMO_WEB3_CONFIG } from '@sandbox/shared/web3/tokens';
import { DEMO_CONFIG, Web3Config } from '@sandbox/shared/utils/tokens';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { ContractsService } from '../services/contracts.service';
import { ContractFactoryService } from '@sandbox/shared/web3/services/contract-factory.service';

@Component({
  standalone: true,
  selector: 'sbx-wallet-tools',
  imports: [CommonModule],
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
    ContractFactoryService,
    ContractsService,
  ],
})
export class WalletToolsPage {
  private store = inject(WalletStore);
  private contracts = inject(ContractsService);

  account = computed(() => this.store.account());
  chainId = computed(() => this.store.chainId());
  status = computed(() => this.store.status());
  chainName = computed(() => {
    const id = this.chainId();
    if (!id) return '—';
    const byId = Object.values(CHAINS).find((c) => c.id === id);
    return byId?.name ?? `chain ${id}`;
  });

  ast = signal('0');
  apt = signal('0');

  constructor() {
    effect(() => void this.status());
  }

  async connect() {
    await this.store.connect();
    await this.refresh();
  }

  async ensureSepolia() {
    const c = CHAINS['sepolia'];
    await this.store.switchOrAddChain({
      chainIdHex: c.hex,
      chainName: c.name,
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: c.rpcUrls,
      blockExplorerUrls: c.explorers?.map((e) => e.url),
    });
  }

  async refresh() {
    const acc = this.account();
    if (!acc) return;

    const [ast, apt] = await Promise.all([
      (await this.contracts.ast()).balanceOf(acc),
      (await this.contracts.apt()).balanceOf(acc),
    ]);

    this.ast.set(ast.toString());
    this.apt.set(apt.toString());
  }

  async faucetAST() {
    await (await this.contracts.ast()).faucetClaim();
    await this.refresh();
  }

  async lockAPT1() {
    const acc = this.account();
    if (!acc) return;
    const apt = await this.contracts.apt();
    const locker = await this.contracts.locker();
    await apt.approve(locker.target, 10n ** 18n);
    await locker.start(10n ** 18n);
    await this.refresh();
  }
}
