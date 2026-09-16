import { formatBRL } from "@/lib/utils";

export function buildPurchaseMessage(args: {
  name: string;
  reference?: string | null;
  size: string;
  color: string;
  price: number;
}) {
  return [
    "Olá! Tenho interesse neste produto.",
    `Produto: ${args.name}.`,
    `Referência: ${args.reference || "Não informada"}.`,
    `Tamanho: ${args.size}.`,
    `Cor: ${args.color}.`,
    `Preço: ${formatBRL(args.price)}.`
  ].join(" ");
}
