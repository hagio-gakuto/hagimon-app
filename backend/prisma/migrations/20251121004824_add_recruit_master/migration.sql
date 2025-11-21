-- CreateTable
CREATE TABLE "recruit_years" (
    "recruit_year" INTEGER NOT NULL,
    "display_name" TEXT NOT NULL,
    "theme_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "recruit_years_pkey" PRIMARY KEY ("recruit_year")
);

-- CreateIndex
CREATE UNIQUE INDEX "recruit_years_recruit_year_key" ON "recruit_years"("recruit_year");
