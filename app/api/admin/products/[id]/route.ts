import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  slug: z.string().trim().max(160).optional(),
  reference: z.string().trim().max(80).nullable().optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  price: z.number().finite().nonnegative().optional(),
  category_id: z.string().uuid().nullable().optional(),
  visible: z.boolean().optional(),
  featured: z.boolean().optional()
});

const variantSchema = z.array(z.object({
  id: z.string().uuid().optional(),
  size: z.string().trim().min(1).max(30),
  color: z.string().trim().min(1).max(50),
  stock: z.number().int().min(0).max(100000)
}));

export async function PATCH(req: Request, { params }: { params: Promise<{id:string}> }) {
  try {
    const { id } = await params; const { supabase } = await requireAdmin(); const raw = await req.json();
    if(raw.variants){
      const variants = variantSchema.parse(raw.variants);
      await supabase.from("product_variants").delete().eq("product_id",id);
      const { error } = await supabase.from("product_variants").insert(variants.map(v=>({product_id:id,size:v.size,color:v.color,stock:v.stock})));
      if(error) return NextResponse.json({error:error.message},{status:400});
    }
    if(raw.addImage){
      const image = z.object({url:z.string().url().max(2000),position:z.number().int().min(0)}).parse(raw.addImage);
      const {error}=await supabase.from("product_images").insert({product_id:id,...image});
      if(error) return NextResponse.json({error:error.message},{status:400});
    }
    if(raw.deleteImageId){
      const imageId=z.string().uuid().parse(raw.deleteImageId);
      const {error}=await supabase.from("product_images").delete().eq("id",imageId).eq("product_id",id);
      if(error) return NextResponse.json({error:error.message},{status:400});
    }
    const productFields = productSchema.parse(raw);
    if(Object.keys(productFields).length){
      const payload:any={...productFields};
      if(payload.name && !raw.slug) payload.slug=slugify(payload.name);
      const {error}=await supabase.from("products").update(payload).eq("id",id);
      if(error) return NextResponse.json({error:error.message},{status:400});
    }
    return NextResponse.json({ok:true});
  } catch(e:any) {
    return NextResponse.json({error:e?.issues?.[0]?.message || "Dados inválidos."},{status:400});
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{id:string}> }) {
  const { id } = await params; const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id",id);
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({ok:true});
}
