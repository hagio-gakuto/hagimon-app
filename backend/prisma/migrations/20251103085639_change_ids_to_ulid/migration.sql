/*
  Warnings:

  - The primary key for the `Monster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserMonster` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/

-- DropForeignKey
ALTER TABLE "UserMonster" DROP CONSTRAINT "UserMonster_monsterId_fkey";
ALTER TABLE "UserMonster" DROP CONSTRAINT "UserMonster_userId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "UserMonster_monsterId_idx";

-- AlterTable
ALTER TABLE "Monster" DROP CONSTRAINT "Monster_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserMonster" DROP CONSTRAINT "UserMonster_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "monsterId" SET DATA TYPE TEXT;

-- AddPrimaryKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_pkey" PRIMARY KEY ("id");

-- AddPrimaryKey
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddPrimaryKey
ALTER TABLE "UserMonster" ADD CONSTRAINT "UserMonster_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "UserMonster_monsterId_idx" ON "UserMonster"("monsterId");

-- AddForeignKey
ALTER TABLE "UserMonster" ADD CONSTRAINT "UserMonster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonster" ADD CONSTRAINT "UserMonster_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

