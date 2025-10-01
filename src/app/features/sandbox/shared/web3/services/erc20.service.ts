import { Injectable } from '@angular/core';
import { connectContract } from '../core/ethers-helpers';
import ERC20_ABI from '../contracts/erc20.abi.json';

@Injectable({ providedIn: 'root' })
export class Erc20Service {
  async at(ethereum: any, address: string) {
    return connectContract<any>(ethereum, address, ERC20_ABI);
  }

  async balanceOf(ethereum: any, token: string, owner: string) {
    const c = await this.at(ethereum, token);
    return c.balanceOf(owner) as Promise<bigint>;
  }

  async allowance(
    ethereum: any,
    token: string,
    owner: string,
    spender: string
  ) {
    const c = await this.at(ethereum, token);
    return c.allowance(owner, spender) as Promise<bigint>;
  }

  async approve(ethereum: any, token: string, spender: string, amount: bigint) {
    const c = await this.at(ethereum, token);
    return c.approve(spender, amount);
  }

  async transfer(ethereum: any, token: string, to: string, amount: bigint) {
    const c = await this.at(ethereum, token);
    return c.transfer(to, amount);
  }
}
