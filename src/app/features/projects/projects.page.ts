import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SectionResult } from '@core/data/section.api';
import { ProjectIndexItem } from './projects.model';
import { FormOrderComponent, SubscribeComponent } from '@shared/components';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  imports: [
    FormOrderComponent,
    SubscribeComponent,
    RouterLinkWithLangDirective,
    CommonModule,
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
  standalone: true,
})
export class ProjectsPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed<SectionResult<ProjectIndexItem> | undefined>(
    () => this.data()['index'] as SectionResult<ProjectIndexItem> | undefined
  );

  readonly allItems = computed<ProjectIndexItem[]>(
    () => this.vm()?.items ?? []
  );

  readonly filters = computed<string[]>(() => {
    const set = new Set<string>(['ALL']);

    for (const it of this.allItems())
      (it.category ?? []).forEach((c) => c && set.add(c));
    return Array.from(set);
  });

  readonly selectedFilter = signal<string>('ALL');

  readonly filteredItems = computed<ProjectIndexItem[]>(() => {
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
