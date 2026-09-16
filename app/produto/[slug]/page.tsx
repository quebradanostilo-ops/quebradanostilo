import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VariantSelector } from "@/components/VariantSelector";
import { formatBRL } from "@/lib/utils";
import type { StoreSettings, ProductWithRelations } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const [{ data: product }, { data: settings }] = await Promise.all([
    supabase.from("products").select("*, category:categories(*), images:product_images(*), variants:product_variants(*)").eq("slug", slug).eq("visible", true).single(),
    supabase.from("store_settings").select("*").eq("id", 1).single()
  ]);
  if (!product) notFound();
  const p = product as ProductWithRelations;
  const store = settings as StoreSettings;
  return <><Header settings={store}/><main className="container-ns py-12"><div className="grid gap-10 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">{p.images.map((img, i) => <div key={img.id} className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 ${i === 0 ? "col-span-2" : ""}`}><Image src={img.url} alt={`${p.name} — imagem ${i + 1}`} fill sizes="(max-width: 1024px) 50vw, 45vw" className="object-cover"/></div>)}{!p.images.length && <div className="col-span-2 aspect-[4/5] rounded-2xl bg-neutral-900 grid place-items-center text-neutral-600">Sem imagens cadastradas</div>}</div>
  <div className="lg:pt-8"><div className="text-sm text-neutral-500">{p.category?.name || "Produto"}</div><h1 className="mt-2 text-4xl font-black">{p.name}</h1><div className="mt-4 text-2xl font-bold">{formatBRL(p.price)}</div>{p.reference && <div className="mt-2 text-sm text-neutral-500">Ref.: {p.reference}</div>}<p className="mt-7 whitespace-pre-line leading-7 text-neutral-400">{p.description || "Produto sem descrição cadastrada."}</p><div className="my-8 h-px bg-neutral-900"/><VariantSelector variants={p.variants} product={{name:p.name, reference:p.reference, price:p.price}} instagram={store.instagram} whatsapp={store.whatsapp}/></div></div></main><Footer settings={store}/></>;
}
