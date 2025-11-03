import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 既存のデータを削除
  await prisma.userMonster.deleteMany();
  await prisma.user.deleteMany();
  await prisma.monster.deleteMany();

  // モンスターシードデータを先に追加（ユーザー作成時に参照するため）
  // IDはPrismaの@default(cuid())で自動生成される
  const hagimon = await prisma.monster.create({
    data: {
      name: 'はぎもん',
      description: '博多出身。ブルーハーツ好き。クソコードに厳しい。生産性高いが、雑談好きなのでチームの生産性を落としている気がする（？）',
      imageUrl: 'https://via.placeholder.com/400x400?text=Hagimon',
    },
  });

  const ootamon = await prisma.monster.create({
    data: {
      name: 'おおたもん',
      description: '太田クラスター、クライアントデプロイマン、こどおじと呼ばれている。自称Atsysを変える男。脊髄反射で喋ってるので人の話ほぼ聞いてない。〇〇は殴れば黙らせられるから、、と言っていた。',
      imageUrl: 'https://via.placeholder.com/400x400?text=Ootamon',
    },
  });

  console.log('Created 2 monsters');

  // ユーザーシードデータを追加（UserMonsterも同時に作成）
  // IDはPrismaの@default(cuid())で自動生成される
  await prisma.user.create({
    data: {
      name: '山田太郎',
      age: 25,
      hobby: '読書',
      imageUrl: 'https://via.placeholder.com/200x200?text=Yamada',
      introduction: 'フロントエンドエンジニアとして3年目。ReactとTypeScriptが得意です。',
      userMonster: {
        create: {
          monsterId: hagimon.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: '佐藤花子',
      age: 30,
      hobby: '映画鑑賞',
      imageUrl: 'https://via.placeholder.com/200x200?text=Sato',
      introduction: 'バックエンドエンジニアとして5年目の経験があります。',
      userMonster: {
        create: {
          monsterId: ootamon.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: '鈴木一郎',
      age: 28,
      hobby: 'カフェ巡り',
      imageUrl: 'https://via.placeholder.com/200x200?text=Suzuki',
      introduction: 'フルスタックエンジニアとして幅広い技術を扱っています。',
      userMonster: {
        create: {
          monsterId: hagimon.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: '高橋みどり',
      age: 26,
      hobby: '旅行',
      imageUrl: 'https://via.placeholder.com/200x200?text=Takahashi',
      introduction: 'モバイルアプリ開発に興味があります。',
    },
  });

  await prisma.user.create({
    data: {
      name: '伊藤健太',
      age: 32,
      hobby: '料理',
      imageUrl: 'https://via.placeholder.com/200x200?text=Ito',
      introduction: 'インフラエンジニアとして、クラウド技術に詳しいです。',
    },
  });

  console.log('Created 5 users with UserMonster relationships');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
