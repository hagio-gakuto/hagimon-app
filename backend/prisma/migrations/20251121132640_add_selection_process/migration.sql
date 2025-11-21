-- CreateTable
CREATE TABLE "selection_processes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "recruit_year" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "selection_processes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "selection_processes_recruit_year_name_key" ON "selection_processes"("recruit_year", "name");

-- AddForeignKey
ALTER TABLE "selection_processes" ADD CONSTRAINT "selection_processes_recruit_year_fkey" FOREIGN KEY ("recruit_year") REFERENCES "recruit_years"("recruit_year") ON DELETE CASCADE ON UPDATE CASCADE;
