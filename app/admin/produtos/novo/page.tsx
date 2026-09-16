import { requireAdmin } from "@/lib/auth";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProduct() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase.from("categories").select("id,name").order("name");
  return <div><h1 className="text-3xl font-black">Novo produto</h1><div className="mt-8"><ProductForm categories={categories || []}/></div></div>;
}
