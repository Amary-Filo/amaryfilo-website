export interface BlogIndexItem {
  slug: string;
  title: string;
  date: string;
  updates: string[];
  category: string;
  category_list: string[];
  anonce: string;
  tags: string[];
  icon?: string;
  color?: string;
}

export interface BlogArticleDetail extends BlogIndexItem {
  links: BlogArticleLinks[];
  content: ContentBlock[];
  menu: BlogArticleMenu[];
}

export interface BlogArticleMenu {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface BlogArticleLinks {
  id: string;
  title: string;
  url: string;
  icon: string;
  color?: string;
}

export interface CategoryIndexItem {
  slug: string;
  title: string;
  icon: string;
  color: string;
  count: number;
}

interface BaseBlock {
  wide?: boolean;
}

export interface PBlock extends BaseBlock {
  type: 'p';
  text?: string;
  html?: string;
}
export interface H2Block {
  type: 'h2';
  text: string;
  id?: string;
}
export interface H3Block {
  type: 'h3';
  text: string;
  id?: string;
}
export interface CodeBlock extends BaseBlock {
  type: 'code';
  lang: 'css' | 'typescript' | 'html' | 'js' | 'bash' | string;
  code: string;
}
export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt?: string;
}
export interface UlBlock {
  type: 'ul';
  items: string[];
}
export interface OlBlock {
  type: 'ol';
  items: string[];
}
export interface DlBlock {
  type: 'dl';
  items: Array<{ dt: string; dd: string }>;
}
export interface QuoteBlock {
  type: 'quote';
  text: string;
  cite?: string;
}
export interface EmbedCodepenBlock {
  type: 'embed';
  provider: 'codepen';
  slug: string;
  theme?: 'dark' | 'light';
  preview?: boolean;
}
export interface NoteBlock extends BaseBlock {
  type: 'note';
  kind: 'info' | 'warn' | 'att';
  title?: string;
  blocks: ContentBlock[];
}

export type ContentBlock =
  | PBlock
  | H2Block
  | H3Block
  | CodeBlock
  | ImageBlock
  | UlBlock
  | OlBlock
  | DlBlock
  | QuoteBlock
  | EmbedCodepenBlock
  | NoteBlock;
