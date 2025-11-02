import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 既存のデータを削除
  await prisma.userMonster.deleteMany();
  await prisma.user.deleteMany();
  await prisma.monster.deleteMany();

  // ユーザーシードデータを追加
  const users = await prisma.user.createMany({
    data: [
      {
        name: '山田太郎',
        age: 25,
        hobby: '読書',
        imageUrl: 'https://via.placeholder.com/200x200?text=Yamada',
        introduction: 'フロントエンドエンジニアとして3年目。ReactとTypeScriptが得意です。',
        yearsOfExperience: 3,
        programmingLevel: '中級',
        techSkills: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
      },
      {
        name: '佐藤花子',
        age: 30,
        hobby: '映画鑑賞',
        imageUrl: 'https://via.placeholder.com/200x200?text=Sato',
        introduction: 'バックエンドエンジニアとして5年目の経験があります。',
        yearsOfExperience: 5,
        programmingLevel: '上級',
        techSkills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      },
      {
        name: '鈴木一郎',
        age: 28,
        hobby: 'カフェ巡り',
        imageUrl: 'https://via.placeholder.com/200x200?text=Suzuki',
        introduction: 'フルスタックエンジニアとして幅広い技術を扱っています。',
        yearsOfExperience: 4,
        programmingLevel: '中級',
        techSkills: ['Python', 'Django', 'Vue.js', 'AWS'],
      },
      {
        name: '高橋みどり',
        age: 26,
        hobby: '旅行',
        imageUrl: 'https://via.placeholder.com/200x200?text=Takahashi',
        introduction: 'モバイルアプリ開発に興味があります。',
        yearsOfExperience: 2,
        programmingLevel: '初級',
        techSkills: ['Swift', 'iOS', 'SwiftUI'],
      },
      {
        name: '伊藤健太',
        age: 32,
        hobby: '料理',
        imageUrl: 'https://via.placeholder.com/200x200?text=Ito',
        introduction: 'インフラエンジニアとして、クラウド技術に詳しいです。',
        yearsOfExperience: 7,
        programmingLevel: '上級',
        techSkills: ['AWS', 'Terraform', 'Kubernetes', 'Linux'],
      },
    ],
  });

  console.log(`Created ${users.count} users`);

  // モンスターシードデータを追加
  const monsters = await prisma.monster.createMany({
    data: [
      {
        name: 'はぎもん',
        description: '博多出身。ブルーハーツ好き。クソコードに厳しい。生産性高いが、雑談好きなのでチームの生産性を落としている気がする（？）',
        imageUrl: 'https://via.placeholder.com/400x400?text=Hagimon',
      },
      {
        name: 'おおたもん',
        description: '太田クラスター、クライアントデプロイマン、こどおじと呼ばれている。Atsysを変える男。脊髄反射で喋ってるので人の話ほぼ聞いてない。〇〇は殴れば黙らせられるから、、と言っていた。',
        imageUrl: 'https://via.placeholder.com/400x400?text=Ootamon',
      },
    ],
  });

  console.log(`Created ${monsters.count} monsters`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
