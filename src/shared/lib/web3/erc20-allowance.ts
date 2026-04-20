// src/shared/lib/web3/erc20-allowance.ts

import { erc20Abi } from 'viem';
import { getAccount, readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';

export async function ensureErc20Allowance(params: {
  chainId: number;
  tokenAddress: `0x${string}`;
  spender: `0x${string}`;
  amountWei: bigint;
}): Promise<void> {
  const { chainId, tokenAddress, spender, amountWei } = params;

  const appChainId = asAppChainId(chainId);
  const account = getAccount(wagmiConfig);

  if (!account.address) {
    throw new Error('Wallet address not found');
  }

  const allowance = await readContract(wagmiConfig, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [account.address, spender] as const,
    chainId: appChainId,
  });

  if ((allowance as bigint) >= amountWei) {
    return;
  }

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
