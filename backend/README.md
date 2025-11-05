## 開発（Docker）

ローカル Docker で Nest をホットリロード起動します。

```bash
docker compose up -d --build backend db
```

初回はマイグレーションを適用してください。

```bash
docker compose exec backend npm run migrate:dev -- --name init
```

## データベースマイグレーション

### スキーマ変更のフロー

テーブル構造を変更する際の手順です。

#### 1. スキーマファイルを編集

`backend/prisma/schema.prisma` を編集して、モデルやフィールドを変更します。

#### 2. マイグレーションファイルを作成・適用

**開発環境（推奨）:**

```bash
# Dockerコンテナ内で実行
docker compose exec backend npm run migrate:dev -- --name <マイグレーション名>

# 例: ユーザーテーブルにemailカラムを追加
docker compose exec backend npm run migrate:dev -- --name add_user_email
```

このコマンドは以下を自動実行します：
- マイグレーションファイルの生成（`prisma/migrations/`）
- マイグレーションの適用
- Prisma Clientの再生成

**注意**: マイグレーション名は英語で、変更内容を簡潔に表現してください（例：`add_user_email`, `change_ids_to_cuid`）

#### 3. シードデータの実行（必要に応じて）

スキーマ変更に合わせてシードデータも更新してください。

```bash
# シードデータを実行
docker compose exec backend npm run seed
```

### よく使うコマンド

#### マイグレーション関連

```bash
# マイグレーションを作成・適用（開発環境）
docker compose exec backend npm run migrate:dev -- --name <マイグレーション名>

# データベースをリセット（全データ削除 + マイグレーション再適用）
docker compose exec backend npm run prisma:reset:dev

# 既存のマイグレーションを適用（本番環境）
docker compose exec backend npm run prisma:deploy

# スキーマを直接適用（開発環境のみ、マイグレーションファイルは作成されない）
docker compose exec backend npm run prisma db push

# Prisma Clientを再生成
docker compose exec backend npm run generate

# Prisma Studioを起動（データベースの可視化）
docker compose exec backend npm run prisma:studio
```

#### シードデータ

```bash
# シードデータを実行
docker compose exec backend npm run seed
```

### マイグレーションのトラブルシューティング

#### マイグレーションが失敗した場合

```bash
# データベースをリセット（開発環境のみ）
docker compose exec backend npm run prisma:reset:dev

# その後、シードデータを再実行
docker compose exec backend npm run seed
```

#### スキーマとデータベースが不一致の場合

```bash
# スキーマを直接適用（開発環境のみ）
docker compose exec backend npm run prisma db push --accept-data-loss
```

**注意**: `prisma db push`は開発環境でのみ使用してください。本番環境では必ずマイグレーションファイルを使用します。

### マイグレーションのベストプラクティス

1. **マイグレーション名は明確に**: 変更内容が分かる名前を付けましょう
   - ✅ 良い例: `add_user_email`, `remove_tech_skills`, `change_ids_to_cuid`
   - ❌ 悪い例: `update`, `fix`, `change`

2. **本番環境では`prisma:deploy`を使用**: 開発環境では`migrate:dev`、本番環境では`prisma:deploy`を使用します

3. **マイグレーションファイルはコミット**: `prisma/migrations/`ディレクトリは必ずGitにコミットしてください

4. **データ損失に注意**: カラム削除など、データ損失を伴う変更は慎重に行いましょう

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
