import Link from "next/link";
import Image from "next/image";
import type { ProductWithRelations } from "@/types/database";
import { formatBRL } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const image = product.images[0]?.url;
  const stock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  return (
    <Link href={`/produto/${product.slug}`} className="group">
      <article>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800">
          {image ? <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="absolute inset-0 grid place-items-center text-neutral-700 text-sm">Sem imagem</div>}
          {stock <= 0 && <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold">ESGOTADO</span>}
          {product.featured && <span className="absolute right-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-black text-black">DESTAQUE</span>}
        </div>
        <div className="pt-3"><div className="font-bold">{product.name}</div><div className="mt-1 font-semibold">{formatBRL(product.price)}</div>{product.category && <div className="mt-1 text-xs text-neutral-500">{product.category.name}</div>}</div>
      </article>
    </Link>
  );
}
