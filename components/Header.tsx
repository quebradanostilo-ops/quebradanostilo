import type { StoreSettings } from "@/lib/types";

export function Header({ settings }: { settings: StoreSettings | null }) {
  const instagram = settings?.instagram?.replace(/^@/, "");

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/90 backdrop-blur">
      <div className="container-ns flex h-16 items-center justify-between gap-4">
        <a href="/" className="font-black uppercase tracking-tight">
          {settings?.name || "Quebrada no Stilo"}
        </a>

        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="hover:text-neutral-300">
            Início
          </a>

          <a href="#catalogo" className="hover:text-neutral-300">
            Catálogo
          </a>

          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-300"
            >
              Instagram
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}