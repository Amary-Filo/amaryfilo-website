// src/shared/lib/web3/wagmi.config.ts

import { createConfig, fallback, http } from '@wagmi/core';
import { walletConnect } from '@wagmi/connectors';
import { sepolia } from 'viem/chains';
import { environment } from '@env';

const isBrowser = typeof window !== 'undefined';

export const walletConnectConnector = walletConnect({
  projectId: environment.walletConnectId,
  showQrModal: true,
});

const batchedHttp = (url: string) =>
  http(url, {
    batch: {
      batchSize: 20,
      wait: 16,
    },
  });

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: isBrowser ? [walletConnectConnector] : [],
  transports: {
    [sepolia.id]: fallback([
      batchedHttp(`https://sepolia.infura.io/v3/${environment.infuraKey}`),
      batchedHttp('https://ethereum-sepolia.publicnode.com'),
      batchedHttp('https://1rpc.io/sepolia'),
      batchedHttp('https://rpc.sepolia.org'),
    ]),
  },
});
