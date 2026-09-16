import { requireAdmin } from "@/lib/auth";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProduct({ params }: { params: Promise<{ id:string }> }) {
  const { id } = await params; const { supabase } = await requireAdmin();
  const { data: categories } = await supabase.from("categories").select("id,name").order("name");
  const { data: product } = await supabase.from("products").select("id").eq("id",id).single();
  if(!product) return <div>Produto não encontrado.</div>;
  return <div><h1 className="text-3xl font-black">Editar produto</h1><div className="mt-8"><ProductForm productId={id} categories={categories || []}/></div></div>;
}
