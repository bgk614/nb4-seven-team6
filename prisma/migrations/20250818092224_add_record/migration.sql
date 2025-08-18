/*
  Warnings:

  - Changed the type of `name` on the `Badge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."RecordType" AS ENUM ('RUN', 'BIKE', 'SWIM');

-- AlterTable
ALTER TABLE "public"."Badge" DROP COLUMN "name",
ADD COLUMN     "name" "public"."BadgeType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "goalRep" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Record" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "type" "public"."RecordType" NOT NULL,
    "description" TEXT,
    "timeSec" INTEGER NOT NULL,
    "distanceM" INTEGER,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Record_groupId_idx" ON "public"."Record"("groupId");

-- CreateIndex
CREATE INDEX "Record_participantId_idx" ON "public"."Record"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "public"."Badge"("name");

-- CreateIndex
CREATE INDEX "Group_name_idx" ON "public"."Group"("name");

-- AddForeignKey
ALTER TABLE "public"."Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Record" ADD CONSTRAINT "Record_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
