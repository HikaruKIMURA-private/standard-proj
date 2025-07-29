import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
          <form action={logout}>
            <Button type="submit" variant="outline">
              ログアウト
            </Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー情報</CardTitle>
              <CardDescription>あなたのアカウント情報</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>名前:</strong> {user.name || "未設定"}
                </p>
                <p>
                  <strong>メール:</strong> {user.email}
                </p>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>セキュリティ</CardTitle>
              <CardDescription>アカウントのセキュリティ設定</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                パスワードの変更やセキュリティ設定はこちらから行えます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>アクティビティ</CardTitle>
              <CardDescription>最近のアクティビティ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                最近のログイン履歴やアクティビティを確認できます。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
