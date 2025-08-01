"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema } from "@/types/auth";
import { register } from "@/app/actions/auth";
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

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, null);

  const [form, fields] = useForm({
    id: "register-form",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>アカウント作成</CardTitle>
        <CardDescription>新しいアカウントを作成してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...form} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fields.name.id}>名前</Label>
            <Input
              id={fields.name.id}
              name={fields.name.name}
              type="text"
              placeholder="山田太郎"
              required
            />
            {fields.name.errors && (
              <p className="text-sm text-red-500">{fields.name.errors}</p>
            )}
          </div>

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

          <div className="space-y-2">
            <Label htmlFor={fields.confirmPassword.id}>
              パスワード（確認）
            </Label>
            <Input
              id={fields.confirmPassword.id}
              name={fields.confirmPassword.name}
              type="password"
              required
            />
            {fields.confirmPassword.errors && (
              <p className="text-sm text-red-500">
                {fields.confirmPassword.errors}
              </p>
            )}
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "アカウント作成中..." : "アカウント作成"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
