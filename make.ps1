# PowerShell script for Windows - 共通のMakefileコマンド
# 使用方法: .\make.ps1 <command> または .\make <command>

param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

# UTF-8エンコーディングの設定
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

switch ($Command) {
    "init" {
        Write-Host "初回セットアップを開始します..." -ForegroundColor Green
        Write-Host "Dockerイメージをビルドしています..." -ForegroundColor Yellow
        docker compose build --no-cache
        Write-Host "コンテナを起動しています..." -ForegroundColor Yellow
        docker compose up -d
        Write-Host "PostgreSQLの起動を待っています..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
        Write-Host "データベースマイグレーションを実行しています..." -ForegroundColor Yellow
        docker compose exec backend npm run migrate:dev
        Write-Host "セットアップが完了しました!" -ForegroundColor Green
    }
    "up" {
        Write-Host "コンテナを起動しています..." -ForegroundColor Yellow
        docker compose up -d
        Write-Host "起動完了!" -ForegroundColor Green
    }
    "build-and-up" {
        Write-Host "コンテナを再ビルドして起動しています..." -ForegroundColor Yellow
        docker compose up -d --build
        Write-Host "起動完了!" -ForegroundColor Green
    }
    "down" {
        Write-Host "コンテナを停止しています..." -ForegroundColor Yellow
        docker compose down --remove-orphans
        Write-Host "停止完了!" -ForegroundColor Green
    }
    "down-clean" {
        Write-Host "コンテナを停止してボリュームも削除しています..." -ForegroundColor Yellow
        docker compose down --remove-orphans -v
        Write-Host "削除完了!" -ForegroundColor Green
    }
    "restart" {
        Write-Host "コンテナを再起動しています..." -ForegroundColor Yellow
        docker compose down --remove-orphans
        docker compose up -d
        Write-Host "再起動完了!" -ForegroundColor Green
    }
    "restart-fe" {
        Write-Host "フロントエンドコンテナを再起動しています..." -ForegroundColor Yellow
        docker compose restart frontend
        Write-Host "フロントエンドコンテナの再起動完了!" -ForegroundColor Green
    }
    "restart-be" {
        Write-Host "バックエンドコンテナを再起動しています..." -ForegroundColor Yellow
        docker compose restart backend
        Write-Host "バックエンドコンテナの再起動完了!" -ForegroundColor Green
    }
    "db-migrate" {
        Write-Host "データベースマイグレーションを実行しています..." -ForegroundColor Yellow
        docker compose exec backend npm run migrate:dev
    }
    "db-migrate-deploy" {
        Write-Host "本番環境用データベースマイグレーションを実行しています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:deploy
    }
    "db-migrate-dev" {
        Write-Host "データベースマイグレーションを実行しています..." -ForegroundColor Yellow
        docker compose exec backend npm run migrate:dev
    }
    "db-migrate-test" {
        Write-Host "テスト用データベースマイグレーションを実行しています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:migrate:test
    }
    "db-reset-dev" {
        Write-Host "開発用データベースをリセットしています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:reset:dev
    }
    "db-reset-test" {
        Write-Host "テスト用データベースをリセットしています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:reset:test
    }
    "prisma-generate" {
        Write-Host "Prismaクライアントを生成しています..." -ForegroundColor Yellow
        docker compose exec backend npm run generate
    }
    "prisma-studio-dev" {
        Write-Host "Prisma Studioを起動しています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:studio
    }
    "prisma-studio-test" {
        Write-Host "テスト用データベースのPrisma Studioを起動しています..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:studio:test
    }
    "ps" {
        Write-Host "コンテナの状態を確認しています..." -ForegroundColor Yellow
        docker compose ps
    }
    "logs" {
        Write-Host "全てのログを表示します (Ctrl+Cで終了)..." -ForegroundColor Yellow
        docker compose logs -f
    }
    "logs-fe" {
        Write-Host "フロントエンドのログを表示します (Ctrl+Cで終了)..." -ForegroundColor Yellow
        docker compose logs -f frontend
    }
    "logs-be" {
        Write-Host "バックエンドのログを表示します (Ctrl+Cで終了)..." -ForegroundColor Yellow
        docker compose logs -f backend
    }
    "db-seed-dev" {
        Write-Host "バックエンドコンテナ内で開発用シードデータを投入します..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:seed:dev
    }
    "db-seed-test" {
        Write-Host "バックエンドコンテナ内でテスト用シードデータを投入します..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:seed:test
    }
    "be-test-db-setup" {
        Write-Host "バックエンドコンテナ内でテスト用データベースのセットアップを実行します..." -ForegroundColor Yellow
        docker compose exec backend npm run prisma:reset:test
        docker compose exec backend npm run prisma:migrate:test
        docker compose exec backend npm run prisma:seed:test
    }
    "be-test-dev" {
        Write-Host "バックエンドコンテナ内でテストを実行します..." -ForegroundColor Yellow
        docker compose exec backend npm run test:dev
    }
    "db-only" {
        Write-Host "データベースのみをDockerで起動しています..." -ForegroundColor Yellow
        docker compose up -d db
        Write-Host "データベース起動完了！ポート5433で待機中です。" -ForegroundColor Green
    }
    "dev-setup" {
        Write-Host "ローカル開発環境のセットアップを開始します..." -ForegroundColor Green
        Write-Host "1. バックエンドの依存関係をインストールしています..." -ForegroundColor Yellow
        Set-Location backend
        npm install
        Write-Host "2. フロントエンドの依存関係をインストールしています..." -ForegroundColor Yellow
        Set-Location ../frontend
        npm install
        Set-Location ..
        Write-Host "3. データベースを起動しています..." -ForegroundColor Yellow
        docker compose up -d db
        Write-Host "4. PostgreSQLの起動を待っています..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host "5. Prismaクライアントを生成しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        npm run generate
        Set-Location ..
        Write-Host ""
        Write-Host "セットアップ完了！" -ForegroundColor Green
        Write-Host ""
        Write-Host "次に以下を実行してください："
        Write-Host "  1. データベースマイグレーションを実行:"
        Write-Host "     .\make migrate-local"
        Write-Host ""
        Write-Host "  2. 開発サーバーを起動:"
        Write-Host "     .\make dev-be  （別ターミナルで .\make dev-fe）"
    }
    "dev-be" {
        Write-Host "ローカルでバックエンドを起動しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        # ポート3001を使用しているプロセスをチェック
        $process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
        if ($process) {
            Write-Host "ポート3001を使用しているプロセスを終了しています..." -ForegroundColor Yellow
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
        npm run start:dev
    }
    "dev-fe" {
        Write-Host "ローカルでフロントエンドを起動しています..." -ForegroundColor Yellow
        Set-Location frontend
        # ロックファイルを削除（既存のプロセスが残っている場合）
        $lockPath = ".next/dev/lock"
        if (Test-Path $lockPath) {
            Write-Host "既存のロックファイルを削除しています..." -ForegroundColor Yellow
            Remove-Item $lockPath -Force -ErrorAction SilentlyContinue
        }
        # ポート3000を使用しているプロセスをチェック
        $process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
        if ($process) {
            Write-Host "ポート3000を使用しているプロセスを終了しています..." -ForegroundColor Yellow
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
        npm run dev
    }
    "migrate-local" {
        Write-Host "ローカルでマイグレーションを実行しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        npm run migrate:dev
        Set-Location ..
    }
    "generate-local" {
        Write-Host "ローカルでPrismaクライアントを生成しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        npm run generate
        Set-Location ..
    }
    "seed-local" {
        Write-Host "ローカルでシードデータを投入しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        npm run seed
        Set-Location ..
    }
    "studio-local" {
        Write-Host "ローカルでPrisma Studioを起動しています..." -ForegroundColor Yellow
        $env:DATABASE_URL = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { "postgresql://postgres:postgres@localhost:5433/app?schema=public" }
        Set-Location backend
        npm run prisma:studio
    }
    "help" {
        Write-Host "【Docker環境】" -ForegroundColor Cyan
        Write-Host " .\make init - 初回セットアップ（ビルド、起動、マイグレーション）"
        Write-Host " .\make up - コンテナを起動"
        Write-Host " .\make down - コンテナを停止"
        Write-Host " .\make build-and-up - コンテナを再ビルドして起動"
        Write-Host " .\make down-clean - コンテナを停止してボリュームも削除"
        Write-Host " .\make restart - コンテナを再起動"
        Write-Host " .\make restart-fe - フロントエンドコンテナを再起動"
        Write-Host " .\make restart-be - バックエンドコンテナを再起動"
        Write-Host " .\make ps - コンテナの状態を表示"
        Write-Host " .\make logs - 全てのログを表示"
        Write-Host " .\make logs-fe - フロントエンドのログを表示"
        Write-Host " .\make logs-be - バックエンドのログを表示"
        Write-Host ""
        Write-Host "【ローカル開発環境】" -ForegroundColor Cyan
        Write-Host " .\make db-only - データベースのみDockerで起動"
        Write-Host " .\make dev-setup - ローカル開発環境のセットアップ"
        Write-Host " .\make dev-be - ローカルでバックエンドを起動"
        Write-Host " .\make dev-fe - ローカルでフロントエンドを起動"
        Write-Host " .\make migrate-local - ローカルでマイグレーションを実行"
        Write-Host " .\make generate-local - ローカルでPrismaクライアントを生成"
        Write-Host " .\make seed-local - ローカルでシードデータを投入"
        Write-Host " .\make studio-local - ローカルでPrisma Studioを起動"
    }
    default {
        Write-Host "エラー: 不明なコマンド '$Command' です" -ForegroundColor Red
        Write-Host "利用可能なコマンドを確認するには: .\make help" -ForegroundColor Yellow
    }
}

