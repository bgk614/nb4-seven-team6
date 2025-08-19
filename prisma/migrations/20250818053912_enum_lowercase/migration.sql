/*
  Warnings:

  - You are about to drop the column `name` on the `Badge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discordWebhookUrl` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discordInviteUrl` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."BadgeType" AS ENUM ('LIKE_100', 'PARTICIPATION_10', 'RECORD_100');

-- CreateEnum
CREATE TYPE "public"."ExerciseType" AS ENUM ('run', 'bike', 'swim');

-- DropIndex
DROP INDEX "public"."Badge_name_key";

-- AlterTable
ALTER TABLE "public"."Badge" DROP COLUMN "name",
ADD COLUMN     "type" "public"."BadgeType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "discordWebhookUrl" SET NOT NULL,
ALTER COLUMN "discordInviteUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."records" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "exercise" "public"."ExerciseType" NOT NULL,
    "description" TEXT,
    "seconds" INTEGER NOT NULL,
    "distanceKm" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."record_photos" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "record_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "records_groupId_idx" ON "public"."records"("groupId");

-- CreateIndex
CREATE INDEX "records_participantId_idx" ON "public"."records"("participantId");

-- CreateIndex
CREATE INDEX "records_exercise_idx" ON "public"."records"("exercise");

-- CreateIndex
CREATE INDEX "record_photos_recordId_idx" ON "public"."record_photos"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_type_key" ON "public"."Badge"("type");

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."record_photos" ADD CONSTRAINT "record_photos_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
