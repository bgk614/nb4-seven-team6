/*
  Warnings:

  - Made the column `description` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discordWebhookUrl` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discordInviteUrl` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."BadgeType" AS ENUM ('LIKE_100', 'PARTICIPATION_10', 'RECORD_100');

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "discordWebhookUrl" SET NOT NULL,
ALTER COLUMN "discordInviteUrl" SET NOT NULL,
ALTER COLUMN "ownerParticipantId" DROP NOT NULL;
