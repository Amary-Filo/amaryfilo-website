import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SectionResult } from '@core/data/section.api';
import { BlogIndexItem } from '../blog/blog.model';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-blog-page',
  imports: [
    CommonModule,
    TranslatePipe,
    SubscribeComponent,
    FormOrderComponent,
    RouterLinkWithLangDirective,
  ],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.scss',
})
export class BlogPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed<SectionResult<BlogIndexItem> | undefined>(
    () => this.data()['index'] as SectionResult<BlogIndexItem> | undefined
  );

  readonly allItems = computed<BlogIndexItem[]>(() => this.vm()?.items ?? []);

  readonly filters = computed<string[]>(() => {
    const set = new Set<string>(['ALL']);

    for (const it of this.allItems())
      (it.category_list ?? []).forEach((c) => c && set.add(c));
    return Array.from(set);
  });

  readonly selectedFilter = signal<string>('ALL');

  readonly filteredItems = computed<BlogIndexItem[]>(() => {
    const sel = this.selectedFilter();
    const items = this.allItems();

    if (!sel || sel === 'ALL') return items;

    const needle = sel.toLowerCase();
    return items.filter((it) =>
      (it.category_list ?? []).some((c) => c?.toLowerCase() === needle)
    );
  });

  filterData(filter: string) {
    this.selectedFilter.set(filter);
  }
}
