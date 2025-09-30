import { Manifest } from '@sandbox/shared/utils/tokens';
import { WalletToolsPage } from './page/wallet-tools.page';
import { CONTRACTS, SEPOLIA } from './services/contracts/addresses';
import APT_ABI from './services/contracts/apt.abi.json';
import AST_ABI from './services/contracts/ast.abi.json';
import AUCTION_ABI from './services/contracts/auction.abi.json';
import LOCKER_ABI from './services/contracts/locker.abi.json';
import MARKET_ABI from './services/contracts/market.abi.json';
import STAKING_ABI from './services/contracts/staking.abi.json';

export const CRYPTO_WALLET_TOOLS_MANIFEST: Manifest = {
  id: 'crypto-wallet-tools',
  slug: 'wallet-tools',
  kind: 'crypto',
  title: 'Wallet Tools',
  description: 'Connect wallet, balances, faucet AST, lock APT.',
  tags: ['crypto', 'wallet', 'sepolia'],
  component: WalletToolsPage,
  defaultConfig: {
    ui: {
      frameless: true,
    },
    web3: {
      allowedChains: [SEPOLIA],
      allowedWallets: ['injected'],
      contracts: CONTRACTS[SEPOLIA],
      abis: {
        AST: AST_ABI,
        APT: APT_ABI,
        AUCTION: AUCTION_ABI,
        LOCKER: LOCKER_ABI,
        MARKET: MARKET_ABI,
        STAKING: STAKING_ABI,
      },
    },
  },
};
