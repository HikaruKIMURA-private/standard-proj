# Next.js + Supabase + Prisma 認証システム

Next.js 14、Supabase、Prisma を使用した認証機能のベストプラクティス実装です。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (Auth + Database)
- **Prisma** (ORM)
- **Conform** (フォーム管理・バリデーション)
- **shadcn/ui** (UI コンポーネント)
- **Tailwind CSS** (スタイリング)
- **Zod** (スキーマ定義)
- **Server Actions** (サーバーサイド処理)
- **Server Components** (メイン)
- **Jest** (単体テスト)
- **Playwright** (E2E テスト)

## 特徴

- **Server Components 中心**: パフォーマンスと SEO を重視
- **Conform**: Progressive Enhancement 対応のフォーム管理
- **Supabase Auth**: セキュアな認証システム
- **Prisma**: 型安全なデータベース操作
- **shadcn/ui**: 美しく一貫性のある UI
- **包括的なテスト**: 単体テストと E2E テスト

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your-database"
```

### 3. データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run db:generate

# データベースのマイグレーション
npm run db:migrate

# データベースのプッシュ（開発環境）
npm run db:push

# Prisma Studioでデータベースを確認
npm run db:studio
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

## 使用方法

### 認証フロー

1. **新規登録**: `/auth/register`でアカウントを作成
2. **ログイン**: `/auth/login`でログイン
3. **ダッシュボード**: 認証後は自動的に`/dashboard`にリダイレクト

### ルート保護

- 未認証ユーザーは自動的にログインページにリダイレクト
- 認証済みユーザーは認証ページにアクセスするとダッシュボードにリダイレクト

## 利用可能なコマンド

### 開発コマンド

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# コードリント
npm run lint
```

### データベースコマンド

```bash
# Prismaクライアント生成
npm run db:generate

# データベースマイグレーション
npm run db:migrate

# データベースプッシュ（開発環境）
npm run db:push

# Prisma Studio起動（データベースGUI）
npm run db:studio
```

### テストコマンド

```bash
# 単体テスト実行
npm run test

# ウォッチモードでテスト実行
npm run test:watch

# E2Eテスト実行
npm run test:e2e

# E2Eテスト（UIモード）
npm run test:e2e:ui
```

### パッケージ管理コマンド

```bash
# 依存関係インストール
npm install

# 特定パッケージ追加
npm install package-name

# 開発依存関係追加
npm install -D package-name

# パッケージ削除
npm uninstall package-name

# パッケージ更新
npm update
```

### shadcn/ui コマンド

```bash
# 新しいコンポーネント追加
npx shadcn@latest add component-name

# 利用可能なコンポーネント一覧
npx shadcn@latest add --help
```

## テスト

### 単体テスト (Jest)

```bash
# Jestを使用して単体テストを実行
npm run test

# ウォッチモードでテストを実行
npm run test:watch
```

### E2E テスト (Playwright)

```bash
# Playwrightを使用してE2Eテストを実行
npm run test:e2e

# UIモードでテストを実行
npm run test:e2e:ui
```

## パッケージ詳細

### 主要パッケージ

#### **Supabase**

- **認証**: メール/パスワード認証、セッション管理
- **データベース**: PostgreSQL ベースのリアルタイムデータベース
- **設定**: `src/lib/supabase/`でクライアント設定

#### **Prisma**

- **ORM**: 型安全なデータベース操作
- **マイグレーション**: データベーススキーマ管理
- **Studio**: データベース GUI ツール

#### **Conform**

- **フォーム管理**: Progressive Enhancement 対応
- **バリデーション**: Zod と統合した型安全なバリデーション
- **Server Actions**: サーバーサイドフォーム処理

#### **shadcn/ui**

- **UI コンポーネント**: 再利用可能なコンポーネントライブラリ
- **テーマ**: Tailwind CSS ベースのデザインシステム
- **アクセシビリティ**: WAI-ARIA 準拠

#### **Jest**

- **単体テスト**: 高速なテスト実行
- **TypeScript**: 完全な TypeScript サポート
- **ウォッチモード**: ファイル変更の自動検知

#### **Playwright**

- **E2E テスト**: ブラウザベースの統合テスト
- **マルチブラウザ**: Chromium、Firefox、WebKit 対応
- **デバッグ**: UI モードでのテストデバッグ

## プロジェクト構造

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx (Server Component)
│   │   └── register/page.tsx (Server Component)
│   ├── dashboard/page.tsx (Server Component)
│   ├── actions/
│   │   └── auth.ts (Server Actions)
│   └── layout.tsx
├── components/
│   ├── auth/
│   │   ├── login-form.tsx (Client Component)
│   │   └── register-form.tsx (Client Component)
│   └── ui/ (shadcn/ui)
├── lib/
│   ├── supabase/
│   ├── prisma.ts
│   └── auth.ts
├── types/
│   └── auth.ts
└── test/
    ├── unit/ (Jest)
    └── e2e/ (Playwright)
```

## ベストプラクティス

### セキュリティ

- Supabase Auth による安全な認証
- ミドルウェアによるルート保護
- 環境変数の適切な管理

### パフォーマンス

- Server Components の活用
- 必要最小限の Client Components
- Progressive Enhancement

### 開発体験

- TypeScript による型安全性
- Conform によるフォーム管理
- 包括的なテストカバレッジ

## トラブルシューティング

### よくある問題

#### **環境変数の設定**

```bash
# .env.localファイルが存在することを確認
ls -la .env.local

# 環境変数の読み込み確認
npm run dev
```

#### **データベース接続**

```bash
# Prismaクライアントの再生成
npm run db:generate

# データベース接続テスト
npm run db:studio
```

#### **テストの実行**

```bash
# 単体テストの実行確認
npm run test

# E2Eテストの実行確認
npm run test:e2e
```

## ライセンス

MIT
# standard-proj
