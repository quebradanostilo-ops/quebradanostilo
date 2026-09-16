create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  reference text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  category_id uuid references public.categories(id) on delete set null,
  featured boolean not null default false,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  position integer not null default 0
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  color text not null,
  stock integer not null default 0 check (stock >= 0),
  updated_at timestamptz not null default now(),
  unique(product_id, size, color)
);

create table if not exists public.store_settings (
  id integer primary key default 1 check (id = 1),
  name text not null,
  instagram text not null,
  whatsapp text,
  logo text,
  description text,
  address text,
  hours text,
  phone text,
  other_socials jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- A senha NÃO é armazenada nesta tabela. O Supabase Auth gerencia a senha com segurança.
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.store_settings (id, name, instagram)
values (1, 'Quebrada no Stilo', 'quebrada_no_stiloo')
on conflict (id) do nothing;

insert into public.categories (name, slug, visible) values
('Camisetas','camisetas',true),
('Calças','calcas',true),
('Bermudas','bermudas',true),
('Moletons','moletons',true),
('Tênis','tenis',true),
('Acessórios','acessorios',true),
('Novidades','novidades',true)
on conflict (slug) do nothing;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.store_settings enable row level security;
alter table public.admins enable row level security;

create policy "public read visible categories" on public.categories for select using (visible = true);
create policy "admins manage categories" on public.categories for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

create policy "public read visible products" on public.products for select using (visible = true);
create policy "admins manage products" on public.products for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

create policy "public read images of visible products" on public.product_images for select using (
  exists(select 1 from public.products p where p.id = product_id and p.visible = true)
);
create policy "admins manage images" on public.product_images for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

create policy "public read variants of visible products" on public.product_variants for select using (
  exists(select 1 from public.products p where p.id = product_id and p.visible = true)
);
create policy "admins manage variants" on public.product_variants for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

create policy "public read store settings" on public.store_settings for select using (true);
create policy "admins manage store settings" on public.store_settings for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

create policy "admins read own admin row" on public.admins for select using (auth.uid() = id);
create policy "admins manage admin rows" on public.admins for all using (exists(select 1 from public.admins a where a.id = auth.uid() and a.active));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "public read product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "admins upload product images" on storage.objects for insert with check (
  bucket_id = 'product-images' and exists(select 1 from public.admins a where a.id = auth.uid() and a.active)
);
create policy "admins update product images" on storage.objects for update using (
  bucket_id = 'product-images' and exists(select 1 from public.admins a where a.id = auth.uid() and a.active)
);
create policy "admins delete product images" on storage.objects for delete using (
  bucket_id = 'product-images' and exists(select 1 from public.admins a where a.id = auth.uid() and a.active)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists variants_updated_at on public.product_variants;
create trigger variants_updated_at before update on public.product_variants for each row execute function public.set_updated_at();
drop trigger if exists settings_updated_at on public.store_settings;
create trigger settings_updated_at before update on public.store_settings for each row execute function public.set_updated_at();
