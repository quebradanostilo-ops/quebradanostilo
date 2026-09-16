import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(160).optional(),
  reference: z.string().trim().max(80).nullable().optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  price: z.number().finite().nonnegative(),
  category_id: z.string().uuid().nullable().optional(),
  visible: z.boolean(),
  featured: z.boolean()
});

export async function POST(req: Request) {
  try {
    const { supabase } = await requireAdmin();
    const raw = await req.json();
    const parsed = schema.parse(raw);
    const slug = slugify(parsed.slug || parsed.name);
    const { data, error } = await supabase.from("products").insert({...parsed, slug}).select("id").single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    return NextResponse.json(data);
  } catch(e:any) {
    return NextResponse.json({error:e?.issues?.[0]?.message || "Dados inválidos."},{status:400});
  }
}
