import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Prismaからユーザー情報を取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  });

  return {
    id: user.id,
    email: user.email,
    name: dbUser?.name,
    avatarUrl: dbUser?.avatarUrl,
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("認証が必要です");
  }

  return user;
}
