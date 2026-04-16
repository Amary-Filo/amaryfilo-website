// src/entities/experience/model/experience.type.ts

export interface IExperienceItem {
  company?: string;
  title: string;
  summary: string;

  period?: string;
  location?: string;

  bullets?: string[];
  featured?: boolean;
}
