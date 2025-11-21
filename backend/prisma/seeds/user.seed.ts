import { PrismaClient } from '@prisma/client';

/**
 * User シード作成用
 */
export async function seedUsers({ prisma }: { prisma: PrismaClient }) {
  console.log('User シード作成を開始...');

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

  console.log(`${users.count} 件の User 作成完了`);
}
