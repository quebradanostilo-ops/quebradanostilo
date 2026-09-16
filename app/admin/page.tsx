import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const [{ count: products }, { count: visible }, { count: categories }, { data: variants }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("visible", true),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("product_variants").select("stock")
  ]);
  const low = (variants || []).filter(v => v.stock > 0 && v.stock <= 3).length;
  const sold = (variants || []).filter(v => v.stock <= 0).length;
  const cards = [["Produtos", products ?? 0], ["Publicados", visible ?? 0], ["Categorias", categories ?? 0], ["Variações esgotadas", sold], ["Estoque baixo", low]];
  return <div><div className="flex items-end justify-between gap-4"><div><p className="text-sm text-neutral-500">Painel</p><h1 className="text-4xl font-black">Dashboard</h1></div><Link href="/admin/produtos/novo" className="btn btn-primary">Novo produto</Link></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{cards.map(([label,value])=><div key={String(label)} className="panel p-5"><div className="text-sm text-neutral-500">{label}</div><div className="mt-2 text-3xl font-black">{value}</div></div>)}</div><div className="mt-8 panel p-6"><h2 className="font-bold">Ações rápidas</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/admin/produtos" className="btn btn-secondary">Gerenciar produtos</Link><Link href="/admin/categorias" className="btn btn-secondary">Gerenciar categorias</Link><Link href="/admin/configuracoes" className="btn btn-secondary">Editar dados da loja</Link></div></div></div>;
}
