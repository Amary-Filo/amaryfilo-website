import { ethers } from 'ethers';

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
