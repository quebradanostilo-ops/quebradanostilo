 "use client";
import { useState } from "react";
import { buildPurchaseMessage } from "@/lib/messages";

export function InstagramButton(props: { instagram: string; name: string; reference?: string | null; size: string; color: string; price: number; disabled?: boolean }) {
  const [status, setStatus] = useState("");
  async function handle() {
    if (props.disabled) return;
    const message = buildPurchaseMessage(props);
    window.open(`https://instagram.com/${props.instagram.replace(/^@/, "")}`, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensagem copiada. Cole no Direct do Instagram.");
    } catch {
      setStatus("Abra o Instagram e envie a mensagem com os dados do produto.");
    }
  }
  return <div><button onClick={handle} disabled={props.disabled} className="btn btn-secondary w-full disabled:opacity-40">Finalizar compra no Instagram</button>{status && <p className="mt-2 text-xs text-neutral-400">{status}</p>}</div>;
}
