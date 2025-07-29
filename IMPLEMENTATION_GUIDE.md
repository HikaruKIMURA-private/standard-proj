# Next.js + Supabase + Prisma 認証システム 実装ガイド

このガイドは、認証システムの実装内容とアーキテクチャについて詳しく解説します。

## アーキテクチャ概要

### 技術スタック

- **Next.js 14** (App Router)
- **Supabase** (Auth + Database)
- **Prisma** (ORM)
- **Conform** (フォーム管理)
- **shadcn/ui** (UI コンポーネント)
- **Zod** (バリデーション)
- **Server Actions** (サーバーサイド処理)
- **Server Components** (メイン)
- **Jest** (単体テスト)
- **Playwright** (E2E テスト)

### 設計原則

1. **Server Components 中心**: パフォーマンスと SEO を重視
2. **Progressive Enhancement**: JavaScript 無効環境でも動作
3. **型安全性**: TypeScript と Zod による完全な型チェック
4. **セキュリティ**: Supabase Auth による安全な認証
5. **テスト駆動**: 単体テストと E2E テストの両方を実装

## 1. Supabase クライアントの設定

### 1.1 ブラウザクライアント (`src/lib/supabase/client.ts`)

- [Supabase Browser Client](https://supabase.com/docs/reference/javascript/create-browser-client)

### 1.2 サーバークライアント (`src/lib/supabase/server.ts`)

- [Supabase Server Client](https://supabase.com/docs/reference/javascript/create-server-client)

### 1.3 ミドルウェアクライアント (`src/lib/supabase/middleware.ts`)

- [Supabase Middleware](https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware)

## 2. Prisma クライアントの設定

### 2.1 Prisma クライアント (`src/lib/prisma.ts`)

- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

### 2.2 データベーススキーマ (`prisma/schema.prisma`)

- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)

## 3. 型定義とバリデーション

### 3.1 認証スキーマ (`src/types/auth.ts`)

- [Zod Schema Validation](https://zod.dev/?id=basic-usage)
- **注意**: Zod v4との互換性問題があるため、v3.22.4を使用

## 4. Server Actions

### 4.1 認証 Actions (`src/app/actions/auth.ts`)

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## 5. 認証ユーティリティ

### 5.1 認証ヘルパー (`src/lib/auth.ts`)

- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## 6. UI コンポーネント

### 6.1 ログインフォーム (`src/components/auth/login-form.tsx`)

- [Conform Form Management](https://conform.guide/getting-started)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

### 6.2 登録フォーム (`src/components/auth/register-form.tsx`)

- [Conform Validation](https://conform.guide/validation)
- [shadcn/ui Form](https://ui.shadcn.com/docs/components/form)

## 7. ページコンポーネント

### 7.1 ログインページ (`src/app/auth/login/page.tsx`)

- [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing)

### 7.2 ダッシュボードページ (`src/app/dashboard/page.tsx`)

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## 8. ミドルウェア

### 8.1 ルート保護 (`src/middleware.ts`)

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## 9. テスト実装

### 9.1 単体テスト (`src/test/unit/auth.test.ts`)

- [Jest Testing](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)

### 9.2 E2E テスト (`src/test/e2e/auth.spec.ts`)

- [Playwright Testing](https://playwright.dev/docs/intro)

## 10. ベストプラクティス

### 10.1 セキュリティ

1. **環境変数の管理**

   - `.env.local`を Git にコミットしない
   - 本番環境ではホスティングプラットフォームの環境変数を使用

2. **認証の実装**

   - Supabase Auth による安全な認証
   - ミドルウェアによるルート保護
   - セッションの自動更新

3. **データベースセキュリティ**
   - Prisma による SQL インジェクション対策
   - 適切なインデックスの設定

### 10.2 パフォーマンス

1. **Server Components の活用**

   - 必要最小限の Client Components
   - サーバーサイドでのデータ取得

2. **Progressive Enhancement**

   - JavaScript 無効環境でも動作
   - Conform によるフォーム管理

3. **キャッシュ戦略**
   - Next.js のキャッシュ機能を活用
   - 適切な revalidate 設定

### 10.3 開発体験

1. **型安全性**

   - TypeScript の活用
   - Zod によるランタイムバリデーション
   - **注意**: Zod v3.22.4を使用（v4との互換性問題回避）

2. **テスト戦略**

   - 単体テスト（Jest）
   - E2E テスト（Playwright）
   - 継続的インテグレーション

3. **コード品質**
   - ESLint による静的解析
   - Prettier によるコードフォーマット
   - 一貫したコーディング規約

## 11. 拡張ポイント

### 11.1 機能拡張

1. **ソーシャルログイン**

   - [Supabase OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)

2. **多要素認証**

   - [Supabase MFA](https://supabase.com/docs/guides/auth/mfa)

3. **ユーザープロフィール**
   - [Supabase Storage](https://supabase.com/docs/guides/storage)

### 11.2 アーキテクチャ拡張

1. **マイクロサービス化**

   - 認証サービスの分離
   - API Gateway の導入

2. **リアルタイム機能**

   - [Supabase Realtime](https://supabase.com/docs/guides/realtime)

3. **監査ログ**
   - ユーザーアクションの記録
   - セキュリティイベントの追跡

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Conform Documentation](https://conform.guide)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Zod Documentation](https://zod.dev) (v3.22.4推奨)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Library Documentation](https://testing-library.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
