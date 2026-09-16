 "use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function SettingsAdmin(){
 const supabase=createClient(); const [form,setForm]=useState<any>({name:"",instagram:"",whatsapp:"",logo:"",description:"",address:"",hours:"",phone:""}); const [msg,setMsg]=useState("");
 useEffect(()=>{(async()=>{const {data}=await supabase.from("store_settings").select("*").eq("id",1).single();if(data)setForm({...data,whatsapp:data.whatsapp||"",logo:data.logo||"",description:data.description||"",address:data.address||"",hours:data.hours||"",phone:data.phone||""})})()},[]);
 function set(k:string,v:string){setForm((x:any)=>({...x,[k]:v}))}
 async function save(){const r=await fetch("/api/admin/settings",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const j=await r.json();setMsg(r.ok?"Configurações salvas.":j.error||"Erro ao salvar.")}
 return <div><h1 className="text-3xl font-black">Configurações da loja</h1><div className="mt-7 grid gap-4 md:grid-cols-2">{[["name","Nome da loja"],["instagram","Instagram"],["whatsapp","WhatsApp"],["logo","URL do logo"],["phone","Telefone"],["address","Endereço"],["hours","Horário de atendimento"]].map(([k,l])=><div key={k}><label className="label">{l}</label><input className="input" value={form[k]||""} onChange={e=>set(k,k==="instagram"?e.target.value.replace(/^@/,""):e.target.value)}/></div>)}</div><div className="mt-4"><label className="label">Descrição</label><textarea className="input min-h-32" value={form.description||""} onChange={e=>set("description",e.target.value)}/></div><button className="btn btn-primary mt-6" onClick={save}>Salvar</button>{msg&&<p className="mt-4 text-sm text-neutral-400">{msg}</p>}</div>;
}
