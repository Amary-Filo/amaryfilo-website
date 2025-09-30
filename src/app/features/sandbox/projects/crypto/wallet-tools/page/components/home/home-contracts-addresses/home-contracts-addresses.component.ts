import { Component } from '@angular/core';
import { UIHomeContractsAddressesItemComponent } from '../home-contracts-addresses-item/home-contracts-addresses-item.component';

@Component({
  selector: 'ui-home-contracts-addresses',
  imports: [UIHomeContractsAddressesItemComponent],
  templateUrl: './home-contracts-addresses.component.html',
  styleUrl: './home-contracts-addresses.component.scss',
  standalone: true,
})
export class UIHomeContractsAddressesComponent {}
