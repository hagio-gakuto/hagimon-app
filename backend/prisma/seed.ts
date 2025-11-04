import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 既存のデータを削除
  await prisma.userMonster.deleteMany();
  await prisma.user.deleteMany();
  await prisma.monster.deleteMany();

  // モンスターシードデータを一括追加
  // IDはPrismaの@default(cuid())で自動生成される
  await prisma.monster.createMany({
    data: [
      {
        name: 'はぎもん',
        description: '福岡出身。ブルーハーツ好き。クソコードに厳しい。生産性高いが、雑談好きなので若干チームの生産性を落としている気がする（？）',
        imageUrl: 'https://placehold.co/400x400/6366f1/ffffff?text=Hagimon',
      },
      {
        name: 'おおたもん',
        description: '太田クラスター、クライアントデプロイマン、こどおじと呼ばれている。自称Atsysを変える男。脊髄反射で喋ってるので人の話ほぼ聞いてない。',
        imageUrl: 'https://placehold.co/400x400/6366f1/ffffff?text=Ootamon',
      },
    ],
  });

  // 作成したMonsterのIDを取得（UserMonster作成時に使用）
  const monsters = await prisma.monster.findMany({
    orderBy: { createdAt: 'asc' },
  });
  const hagimon = monsters[0];
  const ootamon = monsters[1];

  console.log('Created 2 monsters');

  // ユーザーシードデータを一括追加
  // IDはPrismaの@default(cuid())で自動生成される
  await prisma.user.createMany({
    data: [
      {
        name: '山田太郎',
        age: 25,
        hobby: '読書',
        imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=Yamada',
        introduction: 'フロントエンドエンジニアとして3年目。ReactとTypeScriptが得意です。',
      },
      {
        name: '佐藤花子',
        age: 30,
        hobby: '映画鑑賞',
        imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=Sato',
        introduction: 'バックエンドエンジニアとして5年目の経験があります。',
      },
      {
        name: '鈴木一郎',
        age: 28,
        hobby: 'カフェ巡り',
        imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=Suzuki',
        introduction: 'フルスタックエンジニアとして幅広い技術を扱っています。',
      },
      {
        name: '高橋みどり',
        age: 26,
        hobby: '旅行',
        imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=Takahashi',
        introduction: 'モバイルアプリ開発に興味があります。',
      },
      {
        name: '伊藤健太',
        age: 32,
        hobby: '料理',
        imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=Ito',
        introduction: 'インフラエンジニアとして、クラウド技術に詳しいです。',
      },
    ],
  });

  // 作成したUserのIDを取得（UserMonster作成時に使用）
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
  });

  // UserMonsterリレーションを一括作成
  await prisma.userMonster.createMany({
    data: [
      {
        userId: users[0].id, // 山田太郎
        monsterId: hagimon.id,
      },
      {
        userId: users[1].id, // 佐藤花子
        monsterId: ootamon.id,
      },
      {
        userId: users[2].id, // 鈴木一郎
        monsterId: hagimon.id,
      },
    ],
  });

  console.log('Created 5 users (3 with UserMonster relationships)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
