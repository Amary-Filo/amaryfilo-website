// src/entities/demo/demo.facade.ts

import { Injectable } from '@angular/core';
import { DEMO_ITEMS } from './model/demo.data';
import { IDemoItem } from './model/demo.types';

@Injectable({ providedIn: 'root' })
export class DemoFacade {
  getAll(): IDemoItem[] {
    return DEMO_ITEMS;
  }

  getFeatured(count?: number): IDemoItem[] {
    const items = DEMO_ITEMS.filter((item) => item.featured);
    return count ? items.slice(0, count) : items;
  }

  getBySlug(slug: string): IDemoItem | undefined {
    return DEMO_ITEMS.find((item) => item.slug === slug);
  }
}
