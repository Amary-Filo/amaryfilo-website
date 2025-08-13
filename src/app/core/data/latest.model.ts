// src/app/core/data/latest.model.ts
import { Lang } from '@core/i18n/i18n.model';

// общий каркас
export interface LatestBase {
  slug: string;
  title: string;
  anonce?: string;
  date?: string;
  thumbnail?: string;
  icon?: string;
  color?: string;
}

// Blog
export interface BlogLatest extends LatestBase {
  icon: string;
  color?: string;
  date: string;
  // anonce, slug, title — как в base
}

// Projects
export interface ProjectLatest extends LatestBase {
  status?: 'draft' | 'in_progress' | 'done';
  tools?: string[];
}

// Solutions
export interface SolutionChip {
  title: string;
  color: string;
}
export interface SolutionLatest extends LatestBase {
  tags: string[];
  color: string;
  icon: string;
  chip?: SolutionChip[];
  thumbnail: string; // для solutions ты указал что thumbnail обязателен
}

// Sandbox
export interface SandboxLatest extends LatestBase {
  type: string; // напр. 'component' | 'app' | 'lib' | 'experiment'
}

export type Section = 'designs' | 'blog' | 'projects' | 'solutions' | 'sandbox';

export interface LatestResult<T> {
  items: T[];
  usedLang: Lang;
  requestedLang?: Lang;
  isFallback: boolean;
}

export interface DesignsLatest {
  slug: string;
  title?: string;
  date?: string;
  thumbnail?: string;
}

// сопоставление секции -> тип элемента
export interface LatestMap {
  designs: DesignsLatest;
  blog: BlogLatest;
  projects: ProjectLatest;
  solutions: SolutionLatest;
  sandbox: SandboxLatest;
}
