 "use client";
import { buildPurchaseMessage } from "@/lib/messages";
import { normalizeWhatsApp } from "@/lib/utils";

export function WhatsAppButton(props: { whatsapp: string; name: string; reference?: string | null; size: string; color: string; price: number; disabled?: boolean }) {
  function handle() {
    if (props.disabled) return;
    const number = normalizeWhatsApp(props.whatsapp);
    const message = buildPurchaseMessage(props);
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  return <button onClick={handle} disabled={props.disabled} className="btn btn-primary w-full disabled:opacity-40">Finalizar compra pelo WhatsApp</button>;
}
