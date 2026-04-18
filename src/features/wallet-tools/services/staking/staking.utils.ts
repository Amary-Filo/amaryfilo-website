// src/features/wallet-tools/services/staking/staking.utils.ts

import { erc20Abi } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';

export async function ensureErc20Allowance(params: {
  chainId: number;
  tokenAddress: `0x${string}`;
  tokenAbi: any;
  spender: `0x${string}`;
  amountWei: bigint;
}): Promise<void> {
  const { chainId, tokenAddress, spender, amountWei } = params;
  const appChainId = asAppChainId(chainId);

  const allowance = await readContract(wagmiConfig, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [await getCurrentAddress(), spender] as const,
    chainId: appChainId,
  });

  if ((allowance as bigint) >= amountWei) return;

  const hash = await writeContract(wagmiConfig, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amountWei] as const,
    chainId: appChainId,
  });

  await waitForTransactionReceipt(wagmiConfig, {
    hash,
    chainId: appChainId,
  });
}

async function getCurrentAddress(): Promise<`0x${string}`> {
  const { getAccount } = await import('@wagmi/core');
  const account = getAccount(wagmiConfig);

  if (!account.address) {
    throw new Error('Wallet address not found');
  }

  return account.address;
}
