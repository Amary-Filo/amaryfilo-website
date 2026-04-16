// src/entities/work/model/work.type.ts

export type WorkGroup = 'featured' | 'product' | 'commercial';

export interface IWorkItem {
  id: string;
  title: string;

  meta: string;
  summary: string;
  description: string;

  tags?: string[];

  liveUrl?: string;
  codeUrl?: string;
  image?: string;

  group: WorkGroup;
  year?: string;
}
