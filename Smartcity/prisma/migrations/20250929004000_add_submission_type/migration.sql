-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PROPOSAL',
    "submittedBy" TEXT NOT NULL DEFAULT 'CITY',
    "budget" INTEGER,
    "votingStart" DATETIME,
    "votingEnd" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_projects" ("budget", "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "votingEnd", "votingStart") SELECT "budget", "category", "createdAt", "description", "id", "latitude", "location", "longitude", "status", "title", "votingEnd", "votingStart" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
