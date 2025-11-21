
.PHONY: help init up down restart ps logs build-and-up down-clean db-only dev-setup dev-be dev-fe migrate-local generate-local seed-local studio-local


.DEFAULT_GOAL := help

help: ## ヘルプを表示
	@echo "【Docker環境】"
	@echo "  make init          - 初回セットアップ（ビルド、起動、マイグレーション）"
	@echo "  make up            - コンテナを起動"
	@echo "  make down          - コンテナを停止"
	@echo "  make build-and-up  - コンテナを再ビルドして起動"
	@echo "  make down-clean    - コンテナを停止してボリュームも削除"
	@echo "  make restart       - コンテナを再起動"
	@echo "  make ps            - コンテナの状態を表示"
	@echo "  make logs          - 全てのログを表示"
	@echo ""
	@echo "【ローカル開発環境】"
	@echo "  make db-only       - データベースのみDockerで起動"
	@echo "  make dev-setup     - ローカル開発環境のセットアップ"
	@echo "  make dev-be        - ローカルでバックエンドを起動"
	@echo "  make dev-fe        - ローカルでフロントエンドを起動"
	@echo "  make migrate-local - ローカルでマイグレーションを実行"
	@echo "  make generate-local - ローカルでPrismaクライアントを生成"
	@echo "  make seed-local    - ローカルでシードデータを投入"
	@echo "  make studio-local  - ローカルでPrisma Studioを起動"



init:
	@echo "初回セットアップを開始します..."
	@echo "Dockerイメージをビルドしています..."
	docker compose build --no-cache
	@echo "コンテナを起動しています..."
	docker compose up -d
	@echo "PostgreSQLの起動を待っています..."
	sleep 10
	@echo "データベースマイグレーションを実行しています..."
	docker compose exec backend npm run migrate:dev
	@echo "セットアップが完了しました!"

up:
	@echo "コンテナを起動しています..."
	docker compose up -d
	@echo "起動完了!"

build-and-up:
	@echo "コンテナを再ビルドして起動しています..."
	docker compose up -d --build
	@echo "起動完了!"

down:
	@echo "コンテナを停止しています..."
	docker compose down --remove-orphans
	@echo "停止完了!"

down-clean:
	@echo "コンテナを停止してボリュームも削除しています..."
	docker compose down --remove-orphans -v
	@echo "削除完了!"

restart:
	@echo "コンテナを再起動しています..."
	@make down
	@make up
	@echo "再起動完了!"


# ローカル開発用コマンド
migrate-local:
	@echo "ローカルでマイグレーションを実行しています..."
	cd backend && DATABASE_URL=$${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/app?schema=public} npm run migrate:dev

generate-local:
	@echo "ローカルでPrismaクライアントを生成しています..."
	cd backend && DATABASE_URL=$${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/app?schema=public} npm run generate

seed-local:
	@echo "ローカルでシードデータを投入しています..."
	cd backend && DATABASE_URL=$${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/app?schema=public} npm run seed

studio-local:
	@echo "ローカルでPrisma Studioを起動しています..."
	cd backend && DATABASE_URL=$${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/app?schema=public} npm run prisma:studio

ps:
	@echo "コンテナの状態を確認しています..."
	docker compose ps

logs:
	@echo "全てのログを表示します (Ctrl+Cで終了)..."
	docker compose logs -f

# ローカル開発用コマンド
db-only:
	@echo "データベースのみをDockerで起動しています..."
	docker compose up -d db
	@echo "データベース起動完了！ポート5433で待機中です。"

dev-setup:
	@echo "ローカル開発環境のセットアップを開始します..."
	@echo "1. バックエンドの依存関係をインストールしています..."
	cd backend && npm install
	@echo "2. フロントエンドの依存関係をインストールしています..."
	cd frontend && npm install
	@echo "3. データベースを起動しています..."
	@make db-only
	@echo "4. PostgreSQLの起動を待っています..."
	sleep 5
	@echo "5. Prismaクライアントを生成しています..."
	@make generate-local
	@echo ""
	@echo "セットアップ完了！"
	@echo ""
	@echo "次に以下を実行してください："
	@echo "  1. データベースマイグレーションを実行:"
	@echo "     make migrate-local"
	@echo ""
	@echo "  2. 開発サーバーを起動:"
	@echo "     make dev-be  （別ターミナルで make dev-fe）"

dev-be:
	@echo "ローカルでバックエンドを起動しています..."
	cd backend && DATABASE_URL=$${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/app?schema=public} npm run start:dev

dev-fe:
	@echo "ローカルでフロントエンドを起動しています..."
	cd frontend && npm run dev
