import {
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { UIBenefitListComponent } from './benefit-list/benefit-list.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import { BalancesService } from '../../../services/balances.service';
import {
  InputChooseValues,
  UIInputChooseComponent,
} from '@sandbox/shared/components/input-choose/input-choose.component';

@Component({
  selector: 'sbx-wallet-tools-staking-tab',
  imports: [
    UIAccordionComponent,
    UIButtonComponent,
    UIBenefitListComponent,
    UIInputComponent,
    UIInputChooseComponent,
  ],
  templateUrl: './staking.component.html',
  styleUrl: './staking.component.scss',
  standalone: true,
})
export class WalletToolsStakingComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);

  readonly status = this.facade.status;

  ast = computed(() => this.balances.formatAst());
  amount = model<string>('');
  percent = model<string>('');

  percents: InputChooseValues[] = [
    {
      title: '15m',
      value: '0.5%',
    },
    {
      title: '30m',
      value: '1.5%',
    },
    {
      title: '45m',
      value: '2.5%',
    },
    {
      title: '60m',
      value: '5.5%',
    },
  ];

  maxBalanceValidator = (v: string) => {
    if (!v) return null;
    const n = Number(v);
    return n > Number(this.ast()) ? `Max ${this.ast()}` : null;
  };

  positiveValidator = (v: string) =>
    !v || Number(v) > 0 ? null : 'Must be > 0';
}
