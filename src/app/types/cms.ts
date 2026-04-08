export type HeroBanner = {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Promotion = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  period: string | null;
  thumbnail_url: string;
  detail_images: string[] | null;
  content: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

