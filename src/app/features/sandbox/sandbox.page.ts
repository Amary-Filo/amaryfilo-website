import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEMOS } from './registry';
import { BaseDemoConfig, Manifest } from './shared/utils/tokens';
import { FormOrderComponent, SubscribeComponent } from '@shared/components';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
  imports: [RouterLink, SubscribeComponent, FormOrderComponent],
  standalone: true,
})
export class SandboxPage {
  data = computed(() => DEMOS);

  vm = computed<Manifest<BaseDemoConfig>[]>(
    () => this.data() as Manifest<BaseDemoConfig>[]
  );

  readonly allItems = computed<Manifest<BaseDemoConfig>[]>(
    () => this.vm() ?? []
  );

  readonly filters = computed<string[]>(() => {
    const set = new Set<string>(['ALL']);

    for (const it of this.allItems()) set.add(it.kind);
    return Array.from(set);
  });

  readonly selectedFilter = signal<string>('ALL');

  readonly filteredItems = computed<Manifest<BaseDemoConfig>[]>(() => {
    const sel = this.selectedFilter();
    const items = this.allItems();

    if (!sel || sel === 'ALL') return items;

    const needle = sel.toLowerCase();
    return items.filter((it) => it.kind === needle);
  });

  filterData(filter: string) {
    this.selectedFilter.set(filter);
  }
}
