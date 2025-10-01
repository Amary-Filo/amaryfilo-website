export type Explorer = { name: string; url: string };

export type ChainDef = {
  id: number;
  hex: string;
  name: string;
  rpcUrls: string[];
  explorers?: Explorer[];
  explorer?: Explorer;
};

export const CHAINS: { [k: string]: ChainDef } = {
  sepolia: {
    id: 11155111,
    hex: '0xaa36a7',
    name: 'Sepolia',
    rpcUrls: [
      'https://rpc.sepolia.org',
      'https://ethereum-sepolia.publicnode.com',
    ],
    explorer: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
} as const;

export type ChainConfig = {
  chainId: string;
  chainName: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
};

export function rpcMapFromChains(ids: number[]): Record<number, string> {
  const out: Record<number, string> = {};

  for (const id of ids) {
    const def = Object.values(CHAINS).find((c) => c.id === id);
    const first = def?.rpcUrls?.[0];

    if (!first) throw new Error(`No RPC for chain ${id} in CHAINS`);
    out[id] = first;
  }

  return out;
}
