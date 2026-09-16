import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = "https://glsxkbnnlgpuyqxfwdet.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return createBrowserClient(url, key);
}