import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ログイン</h1>
          <p className="mt-2 text-sm text-gray-600">
            アカウントをお持ちでない場合は{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500"
            >
              新規登録
            </Link>
          </p>
        </div>

        {searchParams.message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {searchParams.message}
          </div>
        )}

        {searchParams.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {searchParams.error}
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
