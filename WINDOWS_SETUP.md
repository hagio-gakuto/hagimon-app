# Windows環境セットアップガイド

このガイドは、Windows環境でこのプロジェクトをセットアップする方法を説明します。

## Windowsでの対応について

Windowsでは`make`コマンドが標準では利用できないため、PowerShellスクリプトを使用して同等の機能を提供しています。

## 必要なソフトウェア

- Docker Desktop for Windows
- Git for Windows
- PowerShell (Windows標準搭載)

## セットアップ手順

### 1. リポジトリのクローン

```powershell
git clone <your-repo-url>
cd hagimon-app
```

### 2. 初回セットアップ

```powershell
.\make init
```

このコマンドは以下を自動で実行します：
- Dockerイメージのビルド
- コンテナの起動
- PostgreSQLの起動待機
- データベースマイグレーションの実行

### 3. アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## よく使うコマンド

### 基本操作

```powershell
# コンテナを起動
.\make up

# コンテナを停止
.\make down

# コンテナを再起動
.\make restart

# コンテナの状態を確認
.\make ps
```

### ログ確認

```powershell
# 全ログを表示
.\make logs

# フロントエンドのログを表示
.\make logs-fe

# バックエンドのログを表示
.\make logs-be
```

### データベース操作

```powershell
# マイグレーション実行
.\make db-migrate-dev

# データベースリセット
.\make db-reset-dev

# Prisma Studio起動
.\make prisma-studio-dev

# シードデータ投入
.\make db-seed-dev
```

### ビルドと再構築

```powershell
# 再ビルドして起動
.\make build-and-up

# 停止してボリュームも削除
.\make down-clean
```

### ヘルプの表示

利用可能な全コマンドを表示：
```powershell
.\make help
```

## Makefile コマンドとの対応

| Makefile コマンド | Windows PowerShell コマンド |
|-------------------|---------------------------|
| `make init` | `.\make init` |
| `make up` | `.\make up` |
| `make down` | `.\make down` |
| `make build-and-up` | `.\make build-and-up` |
| `make restart` | `.\make restart` |
| `make ps` | `.\make ps` |
| `make logs` | `.\make logs` |
| `make logs-fe` | `.\make logs-fe` |
| `make logs-be` | `.\make logs-be` |
| `make db-migrate-dev` | `.\make db-migrate-dev` |
| `make db-reset-dev` | `.\make db-reset-dev` |
| `make prisma-studio-dev` | `.\make prisma-studio-dev` |
| `make help` | `.\make help` |

## トラブルシューティング

### 実行ポリシーのエラー

PowerShellスクリプトを実行しようとして「スクリプトの実行が無効になっています」というエラーが出る場合：

```powershell
# 現在のポリシーを確認
Get-ExecutionPolicy

# ポリシーを変更（管理者権限が必要な場合あり）
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ポートが既に使用されている場合

```powershell
# ポート3000の使用状況を確認
netstat -ano | findstr :3000

# ポート3001の使用状況を確認
netstat -ano | findstr :3001

# ポート5432の使用状況を確認
netstat -ano | findstr :5432
```

### Dockerが起動していない

Docker Desktopが起動していることを確認してください。タスクバーのDockerアイコンを確認するか、以下で確認：

```powershell
docker --version
docker-compose --version
```

### コンテナが起動しない

ログを確認して問題を特定：

```powershell
# 全コンテナのログ
.\make-commands.ps1 logs

# 特定のコンテナのログ
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 詳細情報

より詳しい情報は、メインの[README.md](./README.md)を参照してください。

