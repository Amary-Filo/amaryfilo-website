import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { FormOrderComponent, SubscribeComponent } from '@shared/components';
import { DesignIndexItem } from '@core/data/designs.api';
import { SectionResult } from '@core/data/section.api';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-designs-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    FormOrderComponent,
    SubscribeComponent,
    RouterLinkWithLangDirective,
  ],
  templateUrl: './designs.page.html',
  styleUrl: './designs.page.scss',
})
export class DesignsPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed<SectionResult<DesignIndexItem> | undefined>(
    () => this.data()['index'] as SectionResult<DesignIndexItem> | undefined
  );

  readonly allItems = computed<DesignIndexItem[]>(() => this.vm()?.items ?? []);

  readonly filters = computed<string[]>(() => {
    const set = new Set<string>(['ALL']);
    for (const it of this.allItems())
      (it.category ?? []).forEach((c) => c && set.add(c));
    return Array.from(set);
  });

  readonly selectedFilter = signal<string>('ALL');

  readonly filteredItems = computed<DesignIndexItem[]>(() => {
    const sel = this.selectedFilter();
    const items = this.allItems();
    if (!sel || sel === 'ALL') return items;
    const needle = sel.toLowerCase();
    return items.filter((it) =>
      (it.category ?? []).some((c) => c?.toLowerCase() === needle)
    );
  });

  filterData(filter: string) {
    this.selectedFilter.set(filter);
  }
}
