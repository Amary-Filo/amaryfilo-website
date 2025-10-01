import { Injectable, inject } from '@angular/core';
import { ProviderService } from '../core/provider.service';
import { WalletStore } from '../core/wallet.store';
import { Erc20Service } from '../services/erc20.service';
import { BaseContractsService } from '../services/base-contract.service';

@Injectable()
export class Web3TokenService {
  private provider = inject(ProviderService);
  private wallet = inject(WalletStore);
  private erc20 = inject(Erc20Service);
  private contracts = inject(BaseContractsService);

  private resolveAddress(addressOrKey: string): string {
    if (/^0x[a-fA-F0-9]{40}$/.test(addressOrKey)) return addressOrKey;
    const addr = this.contracts.getAddress(addressOrKey as any);

    if (!addr)
      throw new Error(`Address for key "${addressOrKey}" not in config`);
    return addr;
  }

  async allowance(
    token: string,
    owner: string,
    spender: string
  ): Promise<bigint> {
    const eth = this.provider.ethereum;
    if (!eth) throw new Error('No EIP-1193 provider');

    return this.erc20.allowance(
      eth,
      this.resolveAddress(token),
      owner,
      this.resolveAddress(spender)
    );
  }

  async approve(token: string, spender: string, amountWei: bigint) {
    const eth = this.provider.ethereum;
    if (!eth) throw new Error('No EIP-1193 provider');

    return this.erc20.approve(
      eth,
      this.resolveAddress(token),
      this.resolveAddress(spender),
      amountWei
    );
  }

  async ensureAllowance(token: string, spender: string, required: bigint) {
    const owner = this.wallet.account();
    if (!owner) throw new Error('No connected account');

    const current = await this.allowance(token, owner, spender);
    if (current >= required) return { neededApprove: false as const };

    const tx = await this.approve(token, spender, required);
    await tx.wait?.();

    return { neededApprove: true as const, tx };
  }
}
