import { formatUnits, parseUnits } from 'ethers';

export const formatToken = (v: bigint, decimals = 18): string => {
  return formatUnits(v, decimals);
};

export const parseToken = (s: string, decimals = 18): bigint => {
  return parseUnits(s || '0', decimals);
};
