# app-template

このリポジトリは、フルスタック Web アプリケーション開発用のテンプレートです。

> **セットアップ時の注意**: `app-template` を文字列検索して、プロジェクト名に書き換えてください。

## 技術スタック

- **パッケージマネージャ**: pnpm (monorepo)
- **Frontend**: Vue 3 + TypeScript + Vite
  - ルーティング: Vue Router
  - 状態管理: Pinia
  - テスト: Vitest (unit) + Playwright (e2e)
  - リント: ESLint (oxlint) + Prettier
- **Backend**: Hono.js + TypeScript
  - ORM: Drizzle
  - テスト: Vitest
- **Shared**: 共通型・スキーマ定義 (Zod)

## プロジェクト構成

```
packages/
├── frontend/     # Vue 3 フロントエンドアプリケーション
├── backend/      # Hono.js バックエンドサーバー
└── shared/       # 共通型定義・スキーマ (frontend/backend で共有)
```

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 開発サーバーの起動

```bash
# 全パッケージの開発サーバーを起動
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### 3. ビルド

```bash
pnpm build
```

### 4. テスト実行

```bash
# 全パッケージのテストを実行
pnpm test

# ユニットテストのみ
pnpm test

# カバレッジ付きテスト
pnpm test:coverage
```

## 各パッケージの詳細

### Frontend (`packages/frontend`)

Vue 3 + Vite で構築されたフロントエンドアプリケーション。

```bash
cd packages/frontend

# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# ユニットテスト
pnpm test:unit

# E2E テスト
pnpm test:e2e

# リント・フォーマット
pnpm lint
pnpm format
```

### Backend (`packages/backend`)

Hono.js で構築されたバックエンドサーバー。

```bash
cd packages/backend

# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# テスト実行
pnpm test
pnpm test:unit
pnpm test:integration
```

### Shared (`packages/shared`)

Frontend と Backend で共有する型定義・スキーマ。Zod を使用しています。

```bash
cd packages/shared

# ビルド
pnpm build

# 開発モード（ファイル監視）
pnpm dev
```

## 環境変数

各パッケージのルートに `.env` ファイルを作成して環境変数を設定してください。

**Backend 例** (`packages/backend/.env`):
```
DATABASE_URL=file:./db.sqlite
PORT=3000
```

**Frontend 例** (`packages/frontend/.env`):
```
VITE_API_URL=http://localhost:3000
```

## 開発ワークフロー

1. **共通型の定義**: `packages/shared/src/index.ts` に型・スキーマを定義
2. **Backend 実装**: `packages/backend/src/` に API エンドポイントを実装
3. **Frontend 実装**: `packages/frontend/src/` に UI コンポーネントを実装
4. **テスト**: 各パッケージでテストを作成・実行
5. **ビルド・デプロイ**: `pnpm build` でビルド後、デプロイ
