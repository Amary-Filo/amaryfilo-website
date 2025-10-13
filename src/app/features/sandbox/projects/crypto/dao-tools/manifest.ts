import { Manifest } from '@sandbox/shared/utils/tokens';
import { DaoToolsPage } from './page/dao-tools.page';
import { CONTRACTS, SEPOLIA } from './services/contracts/addresses';

import APT_ABI from './services/contracts/apt.abi.json';
import AST_ABI from './services/contracts/ast.abi.json';
import FACTORY_ABI from './services/contracts/factory.abi.json';
import ROUTER_ABI from './services/contracts/router.abi.json';
import PAIR_ABI from './services/contracts/pair.abi.json';
import FARM_ABI from './services/contracts/farm.abi.json';

export const CRYPTO_DAO_TOOLS_MANIFEST: Manifest = {
  id: 'crypto-dao-tools',
  slug: 'dao-tools',
  kind: 'crypto',
  title: 'Dao Tools',
  description:
    'A demo project showing basic dApp scenarios: connecting a wallet, checking balances, staking tokens, participating in auctions, and purchasing digital items in the store.',
  tags: [
    'crypto',
    'metamask',
    'wallet',
    'sepolia',
    'contracts',
    'tokens',
    'dao',
  ],
  component: DaoToolsPage,
  defaultConfig: {
    ui: {
      frameless: true,
    },
    web3: {
      allowedChains: [SEPOLIA],
      allowedWallets: ['injected', 'walletconnect'],
      adapterOptions: {
        walletconnect: {
          projectId: '2b4c4b7cf2cd6125d3f67b94a6beeca7',
        },
        injected: {
          preferred: 'metamask',
        },
      },
      contracts: CONTRACTS[SEPOLIA],
      abis: {
        AST: AST_ABI,
        APT: APT_ABI,
        WETH: AST_ABI,
        FACTORY: FACTORY_ABI,
        ROUTER: ROUTER_ABI,
        PAIR_AST_APT: PAIR_ABI,
        PAIR_AST_WETH: PAIR_ABI,
        FARM: FARM_ABI,
      },
    },
  },
};
