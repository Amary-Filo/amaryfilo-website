export interface ProjectIndexItem {
  slug: string;
  title: string;
  category: string[];
  date: string;
  anonce: string;
  instruments: Array<{
    title?: string;
    icon?: string;
    color?: string;
  }>;
}

export interface ProjectDetail extends ProjectIndexItem {
  description: string;
  images: string[];
  logo: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  links: Array<{
    title?: string;
    url: string;
    icon?: string;
    color?: string;
    is_active?: boolean;
  }>;
}
