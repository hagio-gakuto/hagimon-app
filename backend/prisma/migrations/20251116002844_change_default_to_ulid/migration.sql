/*
  Warnings:

  - You are about to drop the `Monster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMonster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserMonster" DROP CONSTRAINT "UserMonster_monsterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserMonster" DROP CONSTRAINT "UserMonster_userId_fkey";

-- DropTable
DROP TABLE "public"."Monster";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserMonster";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,
    "image_url" TEXT,
    "introduction" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monsters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "monsters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_monsters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "monster_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_monsters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_monsters_user_id_key" ON "user_monsters"("user_id");

-- CreateIndex
CREATE INDEX "user_monsters_monster_id_idx" ON "user_monsters"("monster_id");

-- AddForeignKey
ALTER TABLE "user_monsters" ADD CONSTRAINT "user_monsters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_monsters" ADD CONSTRAINT "user_monsters_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "monsters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
