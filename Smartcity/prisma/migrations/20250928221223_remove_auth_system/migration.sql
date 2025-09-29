/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `idea_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `votes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_idea_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "submitterName" TEXT NOT NULL DEFAULT 'Citoyen Anonyme',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_idea_submissions" ("category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title") SELECT "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title" FROM "idea_submissions";
DROP TABLE "idea_submissions";
ALTER TABLE "new_idea_submissions" RENAME TO "idea_submissions";
CREATE TABLE "new_votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "sessionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "votes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_votes" ("createdAt", "id", "projectId", "voteType") SELECT "createdAt", "id", "projectId", "voteType" FROM "votes";
DROP TABLE "votes";
ALTER TABLE "new_votes" RENAME TO "votes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
