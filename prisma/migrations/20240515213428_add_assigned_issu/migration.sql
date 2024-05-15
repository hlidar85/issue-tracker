-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statusId" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "assignedToUserId" TEXT,
    CONSTRAINT "Issue_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("createdAt", "description", "id", "statusId", "title", "updatedAt") SELECT "createdAt", "description", "id", "statusId", "title", "updatedAt" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
