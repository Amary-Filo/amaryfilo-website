// src/entities/work/work.facade.ts

import { Injectable } from '@angular/core';
import { WORK_ITEMS } from './model/work.data';
import { IWorkItem, WorkGroup } from './model/work.types';

@Injectable({ providedIn: 'root' })
export class WorkFacade {
  getAll(): IWorkItem[] {
    return WORK_ITEMS;
  }

  getByGroup(group: WorkGroup): IWorkItem[] {
    return WORK_ITEMS.filter((item) => item.group === group);
  }

  getFeatured(count?: number): IWorkItem[] {
    const items = this.getByGroup('featured');
    return count ? items.slice(0, count) : items;
  }

  getById(id: string): IWorkItem | undefined {
    return WORK_ITEMS.find((item) => item.id === id);
  }
}
