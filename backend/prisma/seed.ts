import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/user.seed';
import { seedRecruitYears } from './seeds/recruit-year.seed';
import { seedSelectionProcesses } from './seeds/selection-process.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('データベースのシードを開始...\n');

  try {
    // 依存関係の順序で実行
    // RecruitYearはマスタデータなので先に作成
    await seedRecruitYears({ prisma });
    console.log('');

    // SelectionProcessを作成
    await seedSelectionProcesses({ prisma });
    console.log('');

    // Userを後で作成
    await seedUsers({ prisma });
    console.log('');

    console.log('すべてのシードが正常に完了しました！');
  } catch (error) {
    console.error('シード実行中にエラーが発生しました:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
