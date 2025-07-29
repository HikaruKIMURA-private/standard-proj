import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login?error=認証に失敗しました");
  }

  // ユーザーが存在する場合はダッシュボードにリダイレクト
  redirect("/dashboard");
}
