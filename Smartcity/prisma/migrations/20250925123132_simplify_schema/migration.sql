/*
  Warnings:

  - You are about to drop the `boite_a_idees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_updates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voting_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `adminNotes` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `expectedBudget` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `impact` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `isVotingOpen` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `sourceApi` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `civicScore` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `votes` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "boite_a_idees";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "project_updates";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "voting_history";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_idea_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "idea_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_idea_submissions" ("category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "userId") SELECT "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "userId" FROM "idea_submissions";
DROP TABLE "idea_submissions";
ALTER TABLE "new_idea_submissions" RENAME TO "idea_submissions";
CREATE TABLE "new_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PROPOSAL',
    "budget" INTEGER,
    "votingStart" DATETIME,
    "votingEnd" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_projects" ("budget", "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "votingEnd", "votingStart") SELECT "budget", "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "votingEnd", "votingStart" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'CITIZEN'
);
INSERT INTO "new_users" ("email", "id", "name", "userType") SELECT "email", "id", "name", "userType" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "votes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_votes" ("createdAt", "id", "projectId", "userId", "voteType") SELECT "createdAt", "id", "projectId", "userId", "voteType" FROM "votes";
DROP TABLE "votes";
ALTER TABLE "new_votes" RENAME TO "votes";
CREATE UNIQUE INDEX "votes_userId_projectId_key" ON "votes"("userId", "projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
