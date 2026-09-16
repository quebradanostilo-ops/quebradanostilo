import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatBRL } from "@/lib/utils";

export default async function AdminProducts() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("products").select("id,name,reference,price,visible,featured,created_at,category:categories(name)").order("created_at", { ascending:false });
  return <div><div className="flex items-end justify-between"><div><h1 className="text-3xl font-black">Produtos</h1><p className="mt-1 text-sm text-neutral-500">Cadastre e publique o estoque real da loja.</p></div><Link href="/admin/produtos/novo" className="btn btn-primary">Novo produto</Link></div><div className="mt-7 overflow-x-auto panel"><table className="w-full text-left text-sm"><thead className="border-b border-neutral-800 text-neutral-500"><tr><th className="p-4">Produto</th><th>Categoria</th><th>Preço</th><th>Status</th><th></th></tr></thead><tbody>{(data || []).map((p:any)=><tr key={p.id} className="border-b border-neutral-900"><td className="p-4"><div className="font-bold">{p.name}</div><div className="text-xs text-neutral-600">{p.reference || "sem referência"}</div></td><td>{p.category?.name || "—"}</td><td>{formatBRL(Number(p.price))}</td><td>{p.visible ? "Publicado" : "Oculto"}{p.featured ? " · Destaque" : ""}</td><td className="pr-4 text-right"><Link className="font-bold text-[var(--accent)]" href={`/admin/produtos/${p.id}`}>Editar</Link></td></tr>)}</tbody></table></div></div>;
}
