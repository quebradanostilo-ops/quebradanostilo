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

const STORE_PHRASE =
  "O estilo da quebrada na sua essência. Roupas masculinas e femininas pra quem vive a rua, representa a vila e não abre mão da atitude.";

const STORE_IMAGE =
  "https://vxewjjbhswmoycdxthan.supabase.co/storage/v1/object/public/product-images/764339821_17981043540117607_7293678904043319612_n.jpg";

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

  const visibleProducts = (products ?? []) as ProductWithRelations[];
  const visibleCategories = (categories ?? []) as Category[];

  return (
    <>
      <Header settings={store} />

      <main className="overflow-hidden bg-white text-[#101B35]">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-blue-100 bg-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />
            <div className="absolute right-[10%] top-16 h-24 w-24 rounded-full border border-blue-200/60" />
          </div>

          <div className="container-ns relative flex flex-col items-center py-16 text-center sm:py-20 md:py-24">
            {/* Identificação */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 transition duration-300 hover:border-blue-400 hover:bg-blue-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              <span className="text-[11px] font-bold uppercase tracking-[.25em] text-blue-800">
                Moda urbana • Streetwear
              </span>
            </div>

            {/* Título centralizado */}
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[.9] tracking-[-.065em] text-[#101B35] sm:text-6xl md:text-7xl lg:text-8xl">
              {store.name}
            </h1>

            <p className="mt-5 text-2xl font-black tracking-tight text-blue-600 sm:text-3xl md:text-4xl">
              Vista sua identidade.
            </p>

            <div className="my-7 h-1 w-20 rounded-full bg-blue-600 transition-all duration-500 hover:w-32" />

            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {STORE_PHRASE}
            </p>

            {/* Botões */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Explorar catálogo <span className="ml-3">→</span>
              </Link>

              <Link
                href="#sobre"
                className="inline-flex items-center justify-center rounded-md border border-[#101B35]/20 bg-white px-7 py-4 text-sm font-bold text-[#101B35] transition duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                Conheça a loja
              </Link>
            </div>

            {/* Imagem menor e centralizada abaixo */}
            <div className="mt-14 w-full max-w-[240px] sm:mt-16 sm:max-w-[290px]">
              <div className="relative rounded-xl border border-blue-100 bg-[#F4F7FC] p-4 shadow-lg shadow-blue-950/5 transition duration-500 hover:-translate-y-1">
                <img
                  src={STORE_IMAGE}
                  alt="Logo da Quebrada no Stilo"
                  className="mx-auto aspect-square w-full object-contain"
                />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-blue-700">
                São Mateus do Sul • PR
              </p>
            </div>

            {/* Identidade da marca */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-blue-100 pt-6 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500 sm:text-xs">
              <span>Atitude</span>
              <span>Identidade</span>
              <span>Estilo</span>
            </div>
          </div>
        </section>

        {/* FAIXA DE IDENTIDADE */}
        <section className="border-b border-blue-100 bg-[#F4F7FC]">
          <div className="container-ns flex flex-wrap items-center justify-between gap-5 py-6">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#101B35] sm:text-sm">
              Moda masculina e feminina
            </p>

            <span className="hidden h-8 w-px bg-blue-200 sm:block" />

            <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-600 sm:text-sm">
              Estilo urbano • Atitude própria
            </p>

            <Link
              href="/catalogo"
              className="text-xs font-bold uppercase tracking-[.15em] text-blue-700 transition duration-300 hover:translate-x-1 hover:text-blue-500"
            >
              Descubra o catálogo →
            </Link>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="container-ns py-20 sm:py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-600">
                Peças selecionadas
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-.04em] text-[#101B35] sm:text-5xl">
                Em destaque<span className="text-blue-600">.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Confira os produtos disponíveis e encontre peças que combinam
                com sua identidade.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex w-fit items-center gap-3 border-b border-blue-400 pb-2 text-sm font-bold text-[#101B35] transition duration-300 hover:gap-5 hover:border-blue-700 hover:text-blue-700"
            >
              Ver catálogo completo <span>→</span>
            </Link>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid-products">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-blue-100 bg-[#F4F7FC] px-6 py-12 text-center sm:px-10">
              <p className="text-xl font-black uppercase tracking-tight text-[#101B35]">
                Novidades em breve.
              </p>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                Ainda não há produtos publicados. Assim que a loja cadastrar
                as peças, elas aparecerão automaticamente nesta seção.
              </p>

              <Link
                href="/catalogo"
                className="mt-6 inline-flex rounded-md border border-blue-300 px-6 py-3 text-sm font-bold text-blue-800 transition duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Acessar catálogo →
              </Link>
            </div>
          )}
        </section>

        {/* CATEGORIAS */}
        <section
          id="categorias"
          className="border-y border-blue-100 bg-[#F4F7FC]"
        >
          <div className="container-ns py-20 sm:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-600">
                  Explore por estilo
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase tracking-[-.04em] text-[#101B35] sm:text-5xl">
                  Categorias<span className="text-blue-600">.</span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-600">
                Encontre suas peças favoritas e navegue pelas categorias
                disponíveis na loja.
              </p>
            </div>

            {visibleCategories.length > 0 ? (
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/catalogo?categoria=${encodeURIComponent(category.slug)}`}
                    className="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-sm border border-blue-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-950/5 sm:min-h-40 sm:p-8"
                  >
                    <span className="absolute -right-2 -top-8 text-8xl font-black text-blue-600/[0.06] transition duration-300 group-hover:text-blue-600/[0.14]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="relative z-10 text-xs font-bold uppercase tracking-[.2em] text-blue-600">
                      Categoria {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
                      <span className="text-xl font-black uppercase tracking-tight text-[#101B35] transition duration-300 group-hover:text-blue-700 sm:text-2xl">
                        {category.name}
                      </span>

                      <span className="text-xl text-blue-600 transition duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-sm border border-blue-100 bg-white p-8">
                <p className="font-semibold text-slate-600">
                  Nenhuma categoria publicada no momento.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="container-ns py-20 sm:py-28">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-600">
                Nossa essência
              </p>

              <p className="mt-5 text-sm font-bold uppercase tracking-[.2em] text-slate-500">
                Quebrada no Stilo
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase leading-[.98] tracking-[-.05em] text-[#101B35] sm:text-5xl md:text-6xl">
                Mais que roupa.
                <br />
                <span className="text-blue-600">
                  Uma forma de representar.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {STORE_PHRASE}
              </p>

              <Link
                href="/catalogo"
                className="mt-8 inline-flex items-center gap-3 border-b border-blue-400 pb-2 text-sm font-bold text-[#101B35] transition duration-300 hover:gap-5 hover:border-blue-700 hover:text-blue-700"
              >
                Descubra seu estilo <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="container-ns pb-20 sm:pb-28">
          <div className="relative overflow-hidden rounded-sm border border-blue-100 bg-[#F4F7FC] p-8 sm:p-12 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-blue-200/70" />
            <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-blue-200/70" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-600">
                Seu estilo começa aqui
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase leading-[.95] tracking-[-.05em] text-[#101B35] sm:text-5xl md:text-6xl">
                Vista sua identidade.
                <br />
                <span className="text-blue-600">
                  Represente sua essência.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Explore o catálogo da Quebrada no Stilo e encontre as peças
                que combinam com você.
              </p>

              <Link
                href="/catalogo"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Explorar catálogo <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={store} />
    </>
  );
}