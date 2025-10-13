import { Component } from '@angular/core';
import { UIHomeDexContractsAddressesItemComponent } from '../home-contracts-addresses-item/home-contracts-addresses-item.component';

@Component({
  selector: 'ui-dex-home-contracts-addresses',
  imports: [UIHomeDexContractsAddressesItemComponent],
  templateUrl: './home-contracts-addresses.component.html',
  styleUrl: './home-contracts-addresses.component.scss',
  standalone: true,
})
export class UIHomeDexContractsAddressesComponent {}
