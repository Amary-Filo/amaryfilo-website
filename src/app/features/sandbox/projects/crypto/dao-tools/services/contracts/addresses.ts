export const SEPOLIA = 11155111;

export const CONTRACTS: Record<string, Record<string, string>> = {
  [SEPOLIA]: {
    AST: '0x2CC8Cad10fEFA524c36676390a3c52A497e3be49',
    APT: '0xC1A7E51E1a2afCb23b1bCb4065Dbc280c8ca1523',
    WETH: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
    FACTORY: '0x7E93D141a5535f866dEF115aF698a058c04A0Bc6',
    ROUTER: '0x28FCb0D62FC84197715799027615D2e364f0Db65',
    PAIR_AST_APT: '0x1f15684924c184E42032F88250a9Be1f2751648E',
    PAIR_AST_WETH: '0xd46f41154f61Bffb4eF37B3dD8CcCb998f3f158A',
    FARM: '0xd845D26108f9d9E5d39862f163Bcc3c11000d629',
  },
} as const;

export type Address = `0x${string}`;
export type ContractsMap = (typeof CONTRACTS)[typeof SEPOLIA];
export type ContractKey = keyof ContractsMap;
export type TokenKey = 'AST' | 'APT' | 'WETH';
export type PairKey = 'PAIR_AST_APT' | 'PAIR_AST_WETH';
