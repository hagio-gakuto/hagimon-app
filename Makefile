
.PHONY: help init up down restart ps db dev-init dev-up dev-down dev-restart dev-logs dev-logs-fe dev-logs-be build-and-up down-clean db-migrate prisma-generate prisma-studio be-seed-dev be-test be-test-db-setup db-reset-dev db-reset-test db-migrate-dev db-migrate-test db-migrate-deploy db-seed-dev db-seed-test restart-fe restart-be logs logs-fe logs-be


.DEFAULT_GOAL := help

help: ## ヘルプを表示
	@echo "利用可能なコマンド:"
	@echo " make init - 初回セットアップ（ビルド、起動、マイグレーション）"
	@echo " make up - コンテナを起動"
	@echo " make build-and-up - コンテナを再ビルドして起動"
	@echo " make down - コンテナを停止"
	@echo " make down-clean - コンテナを停止してボリュームも削除"
	@echo " make restart - コンテナを再起動"
	@echo " make restart-fe - フロントエンドコンテナを再起動"
	@echo " make restart-be - バックエンドコンテナを再起動"
	@echo " make ps - コンテナの状態を表示"
	@echo " make logs - 全てのログを表示"
	@echo " make logs-fe - フロントエンドのログを表示"
	@echo " make logs-be - バックエンドのログを表示"
	@echo " make db-migrate-dev - 開発用データベースのマイグレーションを実行"
	@echo " make db-migrate-test - テスト用データベースのマイグレーションを実行"
	@echo " make prisma-generate - Prismaクライアントを生成"
	@echo " make db-migrate-deploy - 本番環境用データベースのマイグレーションを実行"
	@echo " make prisma-studio-dev - 開発環境用のPrisma Studioを起動"
	@echo " make prisma-studio-test - テスト用データベースのPrisma Studioを起動"
	@echo " make db-seed-dev - バックエンドコンテナ内でシードデータを投入"
	@echo " make db-seed-test - バックエンドコンテナ内でテスト用シードデータを投入"
	@echo " make be-test-dev - 開発環境用バックエンドコンテナ内でテストを実行"
	@echo " make be-test-db-setup - 開発環境用バックエンドコンテナ内でテスト用データベースのセットアップを実行"
	@echo " make db-reset-dev - 開発用データベースをリセット"
	@echo " make db-reset-test - テスト用データベースをリセット"



init:
	@echo "初回セットアップを開始します..."
	@echo "Dockerイメージをビルドしています..."
	docker compose build --no-cache
	@echo "コンテナを起動しています..."
	docker compose up -d
	@echo "PostgreSQLの起動を待っています..."
	# postgresの立ち上がりを待つ簡易sleep
	sleep 10
	@echo "データベースマイグレーションを実行しています..."
	@make db-migrate
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

restart-fe:
	@echo "フロントエンドコンテナを再起動しています..."
	docker compose restart frontend
	@echo "フロントエンドコンテナの再起動完了!"

restart-be:
	@echo "バックエンドコンテナを再起動しています..."
	docker compose restart backend
	@echo "バックエンドコンテナの再起動完了!"

db-migrate:
	@echo "データベースマイグレーションを実行しています..."
	docker compose exec backend npm run migrate:dev

db-migrate-deploy:
	@echo "本番環境用データベースマイグレーションを実行しています..."
	docker compose exec backend npm run prisma:deploy

db-migrate-dev:
	@echo "データベースマイグレーションを実行しています..."
	docker compose exec backend npm run migrate:dev

db-migrate-test:
	@echo "テスト用データベースマイグレーションを実行しています..."
	docker compose exec backend npm run prisma:migrate:test

db-reset-dev:
	@echo "開発用データベースをリセットしています..."
	docker compose exec backend npm run prisma:reset:dev

db-reset-test:
	@echo "テスト用データベースをリセットしています..."
	docker compose exec backend npm run prisma:reset:test

prisma-generate:
	@echo "Prismaクライアントを生成しています..."
	docker compose exec backend npm run generate

prisma-studio-dev:
	@echo "prisma Studioを起動しています..."
	docker compose exec backend npm run prisma:studio

prisma-studio-test:
	@echo "テスト用データベースのprisma Studioを起動しています..."
	docker compose exec backend npm run prisma:studio:test

ps:
	@echo "コンテナの状態を確認しています..."
	docker compose ps

logs:
	@echo "全てのログを表示します (Ctrl+Cで終了)..."
	docker compose logs -f

logs-fe:
	@echo "フロントエンドのログを表示します (Ctrl+Cで終了)..."
	docker compose logs -f frontend

logs-be:
	@echo "バックエンドのログを表示します (Ctrl+Cで終了)..."
	docker compose logs -f backend

db-seed-dev:
	@echo "バックエンドコンテナ内で開発用シードデータを投入します..."
	docker compose exec backend npm run prisma:seed:dev

db-seed-test:
	@echo "バックエンドコンテナ内で開発用シードデータを投入します..."
	docker compose exec backend npm run prisma:seed:test

be-test-db-setup:
	@echo "バックエンドコンテナ内でテスト用データベースのセットアップを実行します..."
	@make db-reset-test
	@make db-migrate-test
	@make db-seed-test

be-test-dev:
	@echo "バックエンドコンテナ内でテストを実行します..."
	docker compose exec backend npm run test:dev
