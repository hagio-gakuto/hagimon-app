import { PrismaClient } from '@prisma/client';

/**
 * SelectionProcess マスタ作成用 seed
 */
export async function seedSelectionProcesses({
  prisma,
}: {
  prisma: PrismaClient;
}) {
  const environment = process.env.NODE_ENV || 'development';
  if (environment === 'production') {
    throw new Error('本番環境で SelectionProcess シードは実行できません。');
  }

  console.log('SelectionProcess マスタ作成を開始...');

  // 年度ごとの選考プロセス
  const selectionProcesses = [
    // 2027卒
    {
      name: 'エントリーシート',
      order: 1,
      recruitYear: 2027,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '一次面接',
      order: 2,
      recruitYear: 2027,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '二次面接',
      order: 3,
      recruitYear: 2027,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '最終面接',
      order: 4,
      recruitYear: 2027,
      createdBy: 'system',
      updatedBy: 'system',
    },
    // 2028卒
    {
      name: 'エントリーシート',
      order: 1,
      recruitYear: 2028,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '適性検査',
      order: 2,
      recruitYear: 2028,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '一次面接',
      order: 3,
      recruitYear: 2028,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '二次面接',
      order: 4,
      recruitYear: 2028,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '最終面接',
      order: 5,
      recruitYear: 2028,
      createdBy: 'system',
      updatedBy: 'system',
    },
    // 2029卒
    {
      name: 'エントリーシート',
      order: 1,
      recruitYear: 2029,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '一次面接',
      order: 2,
      recruitYear: 2029,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: '最終面接',
      order: 3,
      recruitYear: 2029,
      createdBy: 'system',
      updatedBy: 'system',
    },
  ];

  for (const process of selectionProcesses) {
    await prisma.selectionProcess.upsert({
      where: {
        recruitYear_name: {
          recruitYear: process.recruitYear,
          name: process.name,
        },
      },
      update: {
        order: process.order,
        updatedBy: process.updatedBy,
      },
      create: process,
    });
  }

  console.log(
    `${selectionProcesses.length} 件の SelectionProcess 作成完了`,
  );
}

