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

export type NoticeAttachment = {
  name: string;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
};

export type Notice = {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  author: string;
  sort_order: number;
  is_published: boolean;
  images: string[] | null;
  attachments: NoticeAttachment[] | null;
  created_at: string;
  updated_at: string;
};

