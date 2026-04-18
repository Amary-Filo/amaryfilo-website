// src/shared/lib/web3/wagmi.config.ts

import { createConfig, fallback, http } from '@wagmi/core';
import { injected, walletConnect } from '@wagmi/connectors';
import { sepolia } from 'viem/chains';
import { environment } from '@env';

const isBrowser = typeof window !== 'undefined';

const batchedHttp = (url: string) =>
  http(url, {
    batch: {
      batchSize: 20,
      wait: 16,
    },
  });

export const injectedConnector = injected({
  shimDisconnect: true,
  unstable_shimAsyncInject: 1500,
});

export const walletConnectConnector = walletConnect({
  projectId: environment.walletConnectId,
  showQrModal: true,
  isNewChainsStale: false,
  metadata: {
    name: 'amaryfilo.com',
    description: 'Nikita S. portfolio demos',
    url: 'https://amaryfilo.com',
    icons: ['https://amaryfilo.com/og/main-og.jpg'],
  },
  qrModalOptions: {
    themeMode: 'dark',
  },
});

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: isBrowser ? [injectedConnector, walletConnectConnector] : [],
  multiInjectedProviderDiscovery: true,
  transports: {
    [sepolia.id]: fallback([
      batchedHttp(`https://sepolia.infura.io/v3/${environment.infuraKey}`),
      batchedHttp('https://ethereum-sepolia.publicnode.com'),
      batchedHttp('https://1rpc.io/sepolia'),
      batchedHttp('https://rpc.sepolia.org'),
    ]),
  },
});
