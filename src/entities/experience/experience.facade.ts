// src/entities/experience/experience.facade.ts

import { Injectable } from '@angular/core';
import { EXPERIENCE_ITEMS } from './model/experience.data';
import { IExperienceItem } from './model/experience.types';

@Injectable({ providedIn: 'root' })
export class ExperienceFacade {
  getAll(): IExperienceItem[] {
    return EXPERIENCE_ITEMS;
  }

  getFeatured(count?: number): IExperienceItem[] {
    const items = EXPERIENCE_ITEMS.filter((item) => item.featured);
    return count ? items.slice(0, count) : items;
  }
}
