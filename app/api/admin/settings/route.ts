import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

const schema=z.object({
 name:z.string().trim().min(1).max(120),
 instagram:z.string().trim().max(120),
 whatsapp:z.string().trim().max(40).nullable().optional(),
 logo:z.string().trim().max(2000).nullable().optional(),
 description:z.string().trim().max(5000).nullable().optional(),
 address:z.string().trim().max(500).nullable().optional(),
 hours:z.string().trim().max(500).nullable().optional(),
 phone:z.string().trim().max(80).nullable().optional()
});

export async function PATCH(req:Request){
 try{const {supabase}=await requireAdmin();const parsed=schema.parse(await req.json());const {error}=await supabase.from("store_settings").update(parsed).eq("id",1);if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({ok:true})}
 catch(e:any){return NextResponse.json({error:e?.issues?.[0]?.message||"Dados inválidos."},{status:400})}
}
