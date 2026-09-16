import type { StoreSettings } from "@/lib/types";

export function Footer({ settings }: { settings: StoreSettings | null }) {
  const instagram = settings?.instagram?.replace(/^@/, "");

  return (
    <footer className="mt-24 border-t border-neutral-900">
      <div className="container-ns grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-black uppercase">
            {settings?.name || "Quebrada no Stilo"}
          </h2>

          {settings?.description && (
            <p className="mt-3 text-sm text-neutral-400">
              {settings.description}
            </p>
          )}
        </div>

        <div>
          <h3 className="font-bold uppercase">Contato</h3>

          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            {settings?.phone && <p>{settings.phone}</p>}
            {settings?.address && <p>{settings.address}</p>}
            {settings?.hours && <p>{settings.hours}</p>}
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase">Redes sociais</h3>

          <div className="mt-3">
            {instagram ? (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-neutral-400 hover:text-white"
              >
                Instagram
              </a>
            ) : (
              <span className="text-sm text-neutral-500">
                Instagram não informado
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()}{" "}
        {settings?.name || "Quebrada no Stilo"}. Todos os direitos reservados.
      </div>
    </footer>
  );
}