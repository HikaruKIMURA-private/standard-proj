"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/types/auth";
import { redirect } from "next/navigation";

export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "入力データが無効です" };
  }

  const { email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Prismaでユーザー情報を取得または作成
    await prisma.user.upsert({
      where: { email },
      update: { supabaseId: data.user.id },
      create: {
        email,
        supabaseId: data.user.id,
      },
    });
  }

  redirect("/dashboard");
}

export async function register(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return { error: "入力データが無効です" };
  }

  const { name, email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Prismaでユーザー情報を作成
    await prisma.user.create({
      data: {
        email,
        name,
        supabaseId: data.user.id,
      },
    });
  }

  redirect(
    "/auth/login?message=アカウントが作成されました。メールを確認してログインしてください。"
  );
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/auth/login");
}
