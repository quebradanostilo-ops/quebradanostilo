import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import type { ProductWithRelations, StoreSettings, Category } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function Catalogo({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.categoria === "string" ? params.categoria : "";
  const sort = typeof params.ordem === "string" ? params.ordem : "novidades";
  const supabase = await createClient();
  const [{ data: settings }, { data: categories }] = await Promise.all([
    supabase.from("store_settings").select("*").eq("id", 1).single(),
    supabase.from("categories").select("*").eq("visible", true).order("name")
  ]);
  let query = supabase.from("products").select("*, category:categories(*), images:product_images(*), variants:product_variants(*)").eq("visible", true);
  if (q) query = query.ilike("name", `%${q}%`);
  if (category) {
    const cat = (categories as Category[] || []).find(c => c.slug === category);
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (sort === "preco-menor") query = query.order("price", { ascending: true });
  else if (sort === "preco-maior") query = query.order("price", { ascending: false });
  else if (sort === "destaques") query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
  else query = query.order("created_at", { ascending: false });
  const { data: products } = await query;
  const store = settings as StoreSettings;
  return <><Header settings={store}/><main className="container-ns py-14"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">Catálogo</p><h1 className="mt-2 text-4xl font-black">Loja</h1></div><form className="flex w-full max-w-xl gap-2"><input className="input" name="q" defaultValue={q} placeholder="Buscar por nome..." /><select className="input max-w-[180px]" name="ordem" defaultValue={sort}><option value="novidades">Novidades</option><option value="destaques">Destaques</option><option value="preco-menor">Menor preço</option><option value="preco-maior">Maior preço</option></select><button className="btn btn-primary">Buscar</button></form></div>
  <div className="mt-6 flex flex-wrap gap-2"><a className={`rounded-full border px-4 py-2 text-sm ${!category ? "border-[var(--accent)]" : "border-neutral-800"}`} href="/catalogo">Todas</a>{(categories as Category[] || []).map(c => <a key={c.id} className={`rounded-full border px-4 py-2 text-sm ${category === c.slug ? "border-[var(--accent)]" : "border-neutral-800"}`} href={`/catalogo?categoria=${encodeURIComponent(c.slug)}`}>{c.name}</a>)}</div>
  <div className="grid-products mt-10">{(products as ProductWithRelations[] || []).map(p => <ProductCard key={p.id} product={p}/>)}</div>{!products?.length && <div className="py-24 text-center text-neutral-500">Nenhum produto encontrado.</div>}</main><Footer settings={store}/></>;
}
