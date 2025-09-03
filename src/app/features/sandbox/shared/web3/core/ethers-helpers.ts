import { ethers } from 'ethers';

export function format18(n: bigint) {
  return ethers.formatUnits(n, 18);
}

export function parse18(s: string) {
  return ethers.parseUnits(s || '0', 18);
}

export async function getSigner(ethereum: any) {
  const provider = new ethers.BrowserProvider(ethereum);
  return provider.getSigner();
}

export async function connectContract<T extends ethers.BaseContract>(
  ethereum: any,
  address: string,
  abi: any
): Promise<T> {
  const signer = await getSigner(ethereum);
  // @ts-expect-error runtime cast
  return new ethers.Contract(address, abi, signer) as T;
}
