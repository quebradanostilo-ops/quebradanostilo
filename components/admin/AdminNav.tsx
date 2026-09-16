 "use client";
import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";

export function AdminNav() {
  async function logout() { await createClient().auth.signOut(); window.location.href = "/admin/login"; }
  return <header className="border-b border-neutral-900"><div className="container-ns flex min-h-16 flex-wrap items-center justify-between gap-3 py-3"><Link href="/admin" className="font-black">QNS / ADMIN</Link><nav className="flex flex-wrap items-center gap-4 text-sm text-neutral-400"><Link href="/admin/produtos">Produtos</Link><Link href="/admin/categorias">Categorias</Link><Link href="/admin/configuracoes">Configurações</Link><button onClick={logout}>Sair</button></nav></div></header>;
}
