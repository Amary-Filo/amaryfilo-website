export interface DesignIndexItem {
  slug: string;
  title: string;
  category: string[];
  date: string;
  thumbnail?: string;
}

export interface DesignDetail extends DesignIndexItem {
  description: string;
  images: string[];
  links: Array<{
    title?: string;
    url: string;
    icon?: string;
    color?: string;
    is_active?: boolean;
  }>;
}
