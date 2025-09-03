export type Explorer = { name: string; url: string };

export type ChainDef = {
  id: number;
  hex: string;
  name: string;
  rpcUrls: string[];
  explorers?: Explorer[];
};

export const CHAINS = {
  sepolia: {
    id: 11155111,
    hex: '0xaa36a7',
    name: 'Sepolia',
    rpcUrls: [
      'https://rpc.sepolia.org',
      'https://ethereum-sepolia.publicnode.com',
    ],
    explorers: [{ name: 'Etherscan', url: 'https://sepolia.etherscan.io' }],
  },
  // amoy: {
  //   id: 80002,
  //   hex: '0x13882',
  //   name: 'Polygon Amoy',
  //   rpcUrls: ['https://rpc-amoy.polygon.technology'],
  //   explorers: [{ name: 'Polygonscan', url: 'https://amoy.polygonscan.com' }],
  // },
} as const;

export type ChainKey = keyof typeof CHAINS;
export type ChainMap = typeof CHAINS;
