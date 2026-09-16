 "use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";

type Cat={id:string;name:string;slug:string;visible:boolean};
export default function CategoriesAdmin(){
 const supabase=createClient(); const [cats,setCats]=useState<Cat[]>([]); const [name,setName]=useState(""); const [msg,setMsg]=useState("");
 async function load(){const {data}=await supabase.from("categories").select("*").order("name");setCats(data||[])} useEffect(()=>{load()},[]);
 async function add(){if(!name.trim())return;const {error}=await supabase.from("categories").insert({name:name.trim(),slug:slugify(name),visible:true});if(error)setMsg(error.message);else{setName("");setMsg("Categoria criada.");load()}}
 async function toggle(c:Cat){await supabase.from("categories").update({visible:!c.visible}).eq("id",c.id);load()}
 async function remove(c:Cat){if(!confirm(`Excluir "${c.name}"?`))return;const {error}=await supabase.from("categories").delete().eq("id",c.id);if(error)setMsg(error.message);else load()}
 return <div><h1 className="text-3xl font-black">Categorias</h1><div className="panel mt-7 p-5 flex gap-2"><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome da categoria"/><button className="btn btn-primary" onClick={add}>Adicionar</button></div><div className="mt-5 space-y-2">{cats.map(c=><div key={c.id} className="panel flex items-center justify-between p-4"><div><div className="font-bold">{c.name}</div><div className="text-xs text-neutral-600">{c.slug}</div></div><div className="flex gap-2"><button className="btn btn-secondary text-xs" onClick={()=>toggle(c)}>{c.visible?"Desativar":"Ativar"}</button><button className="btn btn-secondary text-xs" onClick={()=>remove(c)}>Excluir</button></div></div>)}</div>{msg&&<p className="mt-4 text-sm text-neutral-400">{msg}</p>}</div>;
}
