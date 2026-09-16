export type Product = {
  id: string;
  name: string;
  slug: string;
  reference: string | null;
  description: string | null;
  price: number;
  category_id: string | null;
  featured: boolean;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  size: string;
  color: string;
  stock: number;
  updated_at: string;
};

export type StoreSettings = {
  id: number;
  name: string;
  instagram: string;
  whatsapp: string | null;
  logo: string | null;
  description: string | null;
  address: string | null;
  hours: string | null;
  phone: string | null;
  other_socials: Record<string, string>;
  updated_at: string;
};

export type ProductWithRelations = Product & {
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
};
