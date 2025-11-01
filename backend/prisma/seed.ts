import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 既存のデータを削除
  await prisma.user.deleteMany();

  // シードデータを追加
  const users = await prisma.user.createMany({
    data: [
      { name: '山田太郎', age: 25, hobby: '読書' },
      { name: '佐藤花子', age: 30, hobby: '映画鑑賞' },
      { name: '鈴木一郎', age: 28, hobby: 'カフェ巡り' },
      { name: '高橋みどり', age: 26, hobby: '旅行' },
      { name: '伊藤健太', age: 32, hobby: '料理' },
    ],
  });

  console.log(`Created ${users.count} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
