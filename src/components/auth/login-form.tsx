"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "@/types/auth";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);

  const [form, fields] = useForm({
    id: "login-form",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  const handleGitHubLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      // エラー処理（必要に応じて）
      console.error("GitHub login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>アカウントにログインしてください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...form} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fields.email.id}>メールアドレス</Label>
            <Input
              id={fields.email.id}
              name={fields.email.name}
              type="email"
              placeholder="example@example.com"
              required
            />
            {fields.email.errors && (
              <p className="text-sm text-red-500">{fields.email.errors}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.password.id}>パスワード</Label>
            <Input
              id={fields.password.id}
              name={fields.password.name}
              type="password"
              required
            />
            {fields.password.errors && (
              <p className="text-sm text-red-500">{fields.password.errors}</p>
            )}
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                または
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full mt-4"
            onClick={handleGitHubLogin}
            disabled={isPending}
          >
            {isPending ? "認証中..." : "GitHubでログイン"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
