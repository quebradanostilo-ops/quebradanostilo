import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import type {
  ProductWithRelations,
  StoreSettings,
  Category,
} from "@/types/database";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: settings, error: settingsError },
    { data: products },
    { data: categories },
  ] = await Promise.all([
    supabase
      .from("store_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle(),

    supabase
      .from("products")
      .select(
        "*, category:categories(*), images:product_images(*), variants:product_variants(*)"
      )
      .eq("visible", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(8),

    supabase
      .from("categories")
      .select("*")
      .eq("visible", true)
      .order("name"),
  ]);

  if (settingsError) {
    console.error(
      "ERRO COMPLETO DO SUPABASE:",
      JSON.stringify(settingsError, null, 2)
    );
  }

  const store: StoreSettings = settings ?? {
    id: 1,
    name: "Quebrada no Stilo",
    instagram: "quebrada_no_stiloo",
    whatsapp: null,
    logo: null,
    description: null,
    address: null,
    hours: null,
    phone: null,
    other_socials: {},
    updated_at: new Date().toISOString(),
  };

  return (
    <>
      <Header settings={store} />

      <main>
        <section className="border-b border-neutral-900">
          <div className="container-ns grid min-h-[560px] items-center py-20 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[.25em] text-[var(--accent)]">
                Streetwear / Moda urbana
              </p>

              <h1 className="max-w-3xl text-5xl font-black tracking-[-.04em] md:text-7xl">
                {store.name}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-400">
                {store.description ||
                  "Estilo urbano, peças selecionadas e identidade própria."}
              </p>

              <Link href="/catalogo" className="btn btn-primary mt-8">
                Explorar catálogo
              </Link>
            </div>

            <div className="mt-10 hidden md:block">
              <div className="aspect-square rounded-[32px] border border-neutral-800 bg-[radial-gradient(circle_at_50%_40%,#252525,transparent_58%)]">
                <div className="grid h-full place-items-center text-8xl font-black text-neutral-800">
                  QNS
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-ns py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">
                Seleção
              </p>

              <h2 className="mt-2 text-3xl font-black">Destaques</h2>
            </div>

            <Link
              href="/catalogo"
              className="text-sm font-bold text-neutral-300"
            >
              Ver tudo →
            </Link>
          </div>

          <div className="grid-products mt-8">
            {(products as ProductWithRelations[] || []).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {!products?.length && (
            <p className="mt-8 text-neutral-500">
              Nenhum produto publicado ainda.
            </p>
          )}
        </section>

        <section
          id="categorias"
          className="border-y border-neutral-900 bg-neutral-950"
        >
          <div className="container-ns py-20">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black">Categorias</h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {(categories as Category[] || []).map((c) => (
                <Link
                  key={c.id}
                  href={`/catalogo?categoria=${encodeURIComponent(c.slug)}`}
                  className="panel p-6 font-bold transition hover:-translate-y-1"
                >
                  {c.name}

                  <span className="mt-2 block text-xs text-neutral-500">
                    Ver produtos →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="container-ns py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">
              Sobre
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Uma presença urbana na internet.
            </h2>

            <p className="mt-5 leading-8 text-neutral-400">
              {store.description ||
                "A loja trabalha com moda streetwear e urbana. Os produtos publicados aqui são administrados diretamente pela loja."}
            </p>
          </div>
        </section>

        <section id="contato" className="container-ns pb-20">
          <div className="panel p-8">
            <h2 className="text-2xl font-black">Fale com a loja</h2>

            <p className="mt-2 text-neutral-400">
              Escolha um produto no catálogo para iniciar seu atendimento.
            </p>

            <Link
              href="/catalogo"
              className="btn btn-secondary mt-6"
            >
              Ir para o catálogo
            </Link>
          </div>
        </section>
      </main>

      <Footer settings={store} />
    </>
  );
}