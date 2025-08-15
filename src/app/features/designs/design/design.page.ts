import { Component, computed, inject } from '@angular/core';
import {
  FormOrderComponent,
  ShareComponent,
  SubscribeComponent,
} from '@shared/components';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DesignDetail } from '../designs.model';
import { SectionItemResult } from '@core/data/section.api';
import { getImagePath } from '@helpers/index';

@Component({
  selector: 'app-design-page',
  imports: [
    FormOrderComponent,
    ShareComponent,
    SubscribeComponent,
    CommonModule,
  ],
  templateUrl: './design.page.html',
  styleUrl: './design.page.scss',
  standalone: true,
})
export class DesignPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed(() => this.data()['design'] as SectionItemResult<DesignDetail>);

  design = computed(() => this.vm()?.item ?? null);
  isFallback = computed(() => !!this.vm()?.isFallback);
  usedLang = computed(() => this.vm()?.usedLang);
  requestedLang = computed(() => this.vm()?.requestedLang);

  imagePath(name: string | undefined): string {
    return getImagePath(name, this.design()?.slug, 'designs');
  }
}
