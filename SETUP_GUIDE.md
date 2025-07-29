# Next.js + Supabase + Prisma 認証システム セットアップガイド

このガイドは、Next.js 14、Supabase、Prisma を使用した認証システムの構築手順を標準化するためのものです。

## 前提条件

- Node.js 18.0.0 以上
- npm または yarn
- Git

## 1. プロジェクトの初期化

### 1.1 Next.js プロジェクトの作成

```bash
npx create-next-app@latest standard --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
cd standard
```

### 1.2 依存関係のインストール

```bash
# 認証・データベース関連
npm install @supabase/supabase-js @supabase/ssr prisma @prisma/client

# フォーム管理・バリデーション
npm install conform zod@3.22.4 @hookform/resolvers

# テスト関連
npm install -D playwright @playwright/test jest @types/jest jest-environment-jsdom

# テストライブラリ
npm install -D @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

## 2. Supabase の設定

### 2.1 Supabase プロジェクトの作成

1. [Supabase](https://supabase.com)にアクセス
2. アカウントを作成またはログイン
3. 「New Project」をクリック
4. プロジェクト名を入力（例：`standard-auth`）
5. データベースパスワードを設定（特殊文字を含まないものを推奨）
6. リージョンを選択
7. 「Create new project」をクリック

### 2.2 環境変数の取得

1. プロジェクトダッシュボードで「Settings」→「API」をクリック
2. 以下の値をコピー：

   - **Project URL**（`NEXT_PUBLIC_SUPABASE_URL`）
   - **anon public**（`NEXT_PUBLIC_SUPABASE_ANON_KEY`）
   - **service_role secret**（`SUPABASE_SERVICE_ROLE_KEY`）

3. 「Settings」→「Database」をクリック
4. 「Direct connection」を選択
5. Connection string の「URI」をコピー（`DATABASE_URL`）

### 2.3 環境変数ファイルの作成

プロジェクトルートに`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL="postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres"
```

## 3. shadcn/ui の設定

### 3.1 shadcn/ui の初期化

```bash
npx shadcn@latest init --yes
```

### 3.2 必要なコンポーネントの追加

```bash
npx shadcn@latest add button input label card form
```

## 4. Prisma の設定

### 4.1 Prisma の初期化

```bash
npx prisma init
```

### 4.2 スキーマの設定

`prisma/schema.prisma`を更新：

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### 4.3 データベースのセットアップ

```bash
npm run db:generate
npm run db:push
```

## 5. テストの設定

### 5.1 Jest の設定

`jest.config.js`を作成：

- [Next.js Jest Setup](https://nextjs.org/docs/testing#jest-and-react-testing-library)

### 5.2 Jest のセットアップファイル

`jest.setup.js`を作成：

- [Jest Setup Files](https://jestjs.io/docs/configuration#setupfilesafterenv-array)

### 5.3 Playwright の設定

`playwright.config.ts`を作成：

- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

## 6. package.json スクリプトの追加

`package.json`の scripts セクションに以下を追加：

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio"
}
```

## 7. 動作確認

### 7.1 開発サーバーの起動

```bash
npm run dev
```

### 7.2 テストの実行

```bash
npm run test
npm run test:e2e
```

### 7.3 データベースの確認

```bash
npm run db:studio
```

## 8. トラブルシューティング

### 8.1 環境変数の問題

- `.env.local`ファイルが正しく作成されているか確認
- パスワードに特殊文字が含まれる場合は URL エンコードが必要
- Supabase プロジェクトが一時停止していないか確認

### 8.2 データベース接続の問題

- Direct connection を使用しているか確認
- パスワードをリセットして再試行
- IP 制限の設定を確認

### 8.3 テストの問題

- Jest と Playwright の設定ファイルが正しく作成されているか確認
- テストファイルのパスが正しいか確認

### 8.4 ConformとZodの互換性問題

- `@conform-to/zod`がZod v4と互換性がない場合がある
- 解決方法: `npm install zod@3.22.4`でZodをv3系にダウングレード
- エラーメッセージ: `Export ZodPipeline doesn't exist in target module`

## 9. 次のステップ

セットアップが完了したら、以下の実装を進めてください：

1. Supabase クライアントの設定
2. 認証関連の Server Actions
3. フォームコンポーネントの実装
4. ページコンポーネントの実装
5. ミドルウェアの設定
6. テストの実装

詳細な実装内容については、`IMPLEMENTATION_GUIDE.md`を参照してください。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Conform Documentation](https://conform.guide)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Zod Documentation](https://zod.dev)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
