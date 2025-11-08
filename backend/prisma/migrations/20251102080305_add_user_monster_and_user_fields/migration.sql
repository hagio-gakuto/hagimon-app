-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "programmingLevel" TEXT,
ADD COLUMN     "techSkills" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER;

-- CreateTable
CREATE TABLE "UserMonster" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "monsterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMonster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMonster_userId_key" ON "UserMonster"("userId");

-- CreateIndex
CREATE INDEX "UserMonster_monsterId_idx" ON "UserMonster"("monsterId");

-- AddForeignKey
ALTER TABLE "UserMonster" ADD CONSTRAINT "UserMonster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonster" ADD CONSTRAINT "UserMonster_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
