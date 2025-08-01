import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">アカウント作成</h1>
          <p className="mt-2 text-sm text-gray-600">
            すでにアカウントをお持ちの場合は{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500"
            >
              ログイン
            </Link>
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
