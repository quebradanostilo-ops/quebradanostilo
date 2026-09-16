 "use client";
import { useMemo, useState } from "react";
import type { ProductVariant } from "@/types/database";
import { InstagramButton } from "./InstagramButton";
import { WhatsAppButton } from "./WhatsAppButton";

export function VariantSelector(props: { variants: ProductVariant[]; product: { name: string; reference?: string | null; price: number }; instagram: string; whatsapp?: string | null }) {
  const sizes = useMemo(() => [...new Set(props.variants.map(v => v.size))], [props.variants]);
  const colors = useMemo(() => [...new Set(props.variants.map(v => v.color))], [props.variants]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const selected = props.variants.find(v => v.size === size && v.color === color);
  const stock = selected?.stock ?? 0;
  const disabled = !selected || stock <= 0;

  return (
    <div className="space-y-5">
      <div><div className="label">Tamanho</div><div className="flex flex-wrap gap-2">{sizes.map(s => <button key={s} onClick={() => setSize(s)} className={`rounded-lg border px-4 py-2 text-sm font-bold ${size === s ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-neutral-700"}`}>{s}</button>)}</div></div>
      <div><div className="label">Cor</div><div className="flex flex-wrap gap-2">{colors.map(c => <button key={c} onClick={() => setColor(c)} className={`rounded-lg border px-4 py-2 text-sm font-bold ${color === c ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-neutral-700"}`}>{c}</button>)}</div></div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm">{!size || !color ? "Selecione tamanho e cor." : stock <= 0 ? "Esgotado para esta combinação." : stock <= 3 ? `Últimas unidades (${stock}).` : `Disponível (${stock}).`}</div>
      <div className="space-y-2">
        <WhatsAppButton whatsapp={props.whatsapp || ""} {...props.product} size={size} color={color} disabled={disabled || !props.whatsapp} />
        <InstagramButton instagram={props.instagram} {...props.product} size={size} color={color} disabled={disabled} />
      </div>
    </div>
  );
}
