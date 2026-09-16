export type StoreSettings = {
  id: number;
  name: string;
  instagram: string | null;
  whatsapp: string | null;
  logo: string | null;
  description: string | null;
  address: string | null;
  hours: string | null;
  phone: string | null;
  other_socials: Record<string, string>;
  updated_at: string;
};