import { Component } from '@angular/core';
import { UIHomeDaoContractsAddressesItemComponent } from '../home-contracts-addresses-item/home-contracts-addresses-item.component';

@Component({
  selector: 'ui-dao-home-contracts-addresses',
  imports: [UIHomeDaoContractsAddressesItemComponent],
  templateUrl: './home-contracts-addresses.component.html',
  styleUrl: './home-contracts-addresses.component.scss',
  standalone: true,
})
export class UIHomeDaoContractsAddressesComponent {}
