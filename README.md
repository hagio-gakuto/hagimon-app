# REC-DX-STUDY: 仮想マッチングアプリ 💘

このプロジェクトは、モダンな技術スタックを用いた Web アプリケーション開発の実践的な学習の場として構築された、仮想マッチングアプリケーションです。

ソフトウェアアーキテクチャのベストプラクティスを探求し、チームでの共同作業に習熟することを目的としています。

---

## 開発の目的

このプロジェクトを通じて、以下の技術や概念の習得を目指します。

### 🎯 設計原則とアーキテクチャ

#### **設計原則の実践**

SOLID 原則や DRY 原則を意識したコーディングを実践します。

- **SOLID 原則**: オブジェクト指向設計における 5 つの重要な原則です。保守性が高く、柔軟なソフトウェアを構築するための指針となります。

  - **S**: 単一責任の原則 (Single Responsibility Principle)
  - **O**: オープン・クローズドの原則 (Open/Closed Principle)
  - **L**: リスコフの置換原則 (Liskov Substitution Principle)
  - **I**: インターフェース分離の原則 (Interface Segregation Principle)
  - **D**: 依存性逆転の原則 (Dependency Inversion Principle)
  - **参考資料**: [SOLID 原則](https://www.youtube.com/watch?v=ol0txPYSQa8&t=3s)

- **DRY 原則**: "Don't Repeat Yourself"（繰り返しを避ける）の略です。同じ情報やロジックが複数の場所に存在することを避け、コードの重複をなくすことを目指します。これにより、変更が容易でバグの少ない、保守性の高いコードを実現できます。

#### **DDD への理解**

ドメイン駆動設計（DDD）の考え方を学び、実装に取り入れます。特に、関心事を分離するレイヤードアーキテクチャを意識して開発を進めます。

- **参考レイヤ構成**:
  - **Presentation Layer (UI 層)**: ユーザーへの情報表示と解釈を担当 (React コンポーネント)。
  - **Application Layer (応用層)**: ユースケースを実現する層。ドメイン層のオブジェクトを使い、タスクを調整します (NestJS の Service など)。
  - **Domain Layer (ドメイン層)**: ビジネスロジックの中核。エンティティや値オブジェクトなど、ドメインの関心事を表現します。
  - **Infrastructure Layer (インフラ層)**: データベース、外部 API など、技術的な詳細を実装する層 (Prisma による DB アクセスなど)。

### ⚛️ React のベストプラクティス習得

React の思想を深く理解し、モダンなフロントエンド開発スキルを身につけます。

#### **UI とロジックの分離**

コンポーネントの責務を明確に分離します。

- **カスタムフック (`use...`)**: データ取得や状態管理、ビジネスロジックを担当します。ロジックを再利用可能な形で切り出すことで、コンポーネントの見通しを良くします。
- **プレゼンテーショナルコンポーネント**: カスタムフックからデータや関数を`props`として受け取り、UI の表示に専念します。「dumb（愚か）」なコンポーネントであることで、再利用性やテストのしやすさを高めます。

#### **コンポーネントの再利用とコンポジション**

「一度書いたコンポーネントは、再利用可能な資産である」という考え方を実践します。

- **汎用コンポーネント**: `Button`や`Modal`など、アプリケーション全体で使える UI パーツを`components/ui`に作成します。
- **`children` props の活用**: `Card`や`Layout`のような汎用的なラッパーコンポーネントを作成し、`children` props を通じて内容を注入する「コンポジション（合成）」のパターンを積極的に用います。

#### **宣言的 UI の徹底**

`UI = f(state)`（UI は状態の関数である）という React の基本思想を徹底します。UI を直接操作するのではなく、状態(`state`)を更新すれば、UI が自動的にあるべき姿に変わる、という宣言的なコーディングを常に意識します。

---

## ✨ 開発のルール

1.  **楽しむ！** - 何よりもまず、開発のプロセスそのものを楽しみましょう！
2.  **クリーンな実装を心がける！** - 常にコードを綺麗に保ち、目的が明確な実装を目指しましょう。
3.  **自走力を高める！** - AI は便利な補助輪ですが、頼りすぎずにまずは自力で考え、実装する力を養いましょう。

---

## 🛠️ 技術スタック

- **フロントエンド**: React Router (Remix), Vite, Chakra UI, TypeScript
- **バックエンド**: NestJS, Prisma, TypeScript
- **データベース**: PostgreSQL
- **インフラ**: Docker
- **モノレポ管理**: **Yarn Workspaces**

---

## 🚀 環境構築

Docker Compose を使用して、フロントエンド、バックエンド、PostgreSQL の環境を一発で構築できます。

### 1. 前提条件

- Docker & Docker Compose
- Git

### 2. 一発セットアップ

```bash
# 1. リポジトリをクローン
git clone <your-repo-url>
cd rec-dx-study

# 2. 全サービスを起動（一発で環境構築完了！）
docker-compose up -d

# 3. データベースマイグレーション（初回のみ）
docker-compose exec backend npx prisma migrate dev
```

### 3. アクセス URL

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

### 4. 開発時の便利なコマンド

```bash
# 全サービスを停止
docker-compose down

# ログを確認
docker-compose logs -f

# 特定のサービスのログを確認
docker-compose logs -f frontend
docker-compose logs -f backend

# コンテナ内でコマンドを実行
docker-compose exec backend bash
docker-compose exec frontend bash
```

### 5. トラブルシューティング

#### ポートが既に使用されている場合

```bash
# 使用中のポートを確認
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001
netstat -tulpn | grep :5432
```

#### データベース接続エラーの場合

```bash
# PostgreSQLコンテナの状態を確認
docker-compose ps db

# データベースのログを確認
docker-compose logs db
```

### 6. 詳細な設定情報

詳細な環境構築手順や設定については、[DOCKER_SETUP.md](./DOCKER_SETUP.md)を参照してください。
