import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("AUTH USER:", user?.id, user?.email);
  console.log("AUTH ERROR:", userError);

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id, email, active")
    .eq("id", user.id)
    .eq("active", true)
    .maybeSingle();

  console.log("ADMIN:", admin);
  console.log("ADMIN ERROR:", adminError);

  if (!admin) {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user, admin };
}