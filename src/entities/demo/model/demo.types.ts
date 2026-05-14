// src/entities/demo/model/demo.type.ts

export interface IDemoItem {
  slug: string;
  img: string;
  title: string;
  text: string;
  summary: string;
  description: string;
  tags?: string[];
  code?: string;
  liveUrl?: string;
  link?: string;
  featured?: boolean;
}
