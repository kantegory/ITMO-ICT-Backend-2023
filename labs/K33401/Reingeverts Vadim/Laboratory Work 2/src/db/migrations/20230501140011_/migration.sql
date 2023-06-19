/*
  Warnings:

  - You are about to alter the column `discount` on the `ReceiptEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `tax` on the `ReceiptEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReceiptEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discount" REAL NOT NULL DEFAULT 0.0,
    "tax" REAL NOT NULL DEFAULT 0.18,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "receiptId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    CONSTRAINT "ReceiptEntry_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReceiptEntry_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReceiptEntry" ("createdAt", "discount", "id", "receiptId", "stockId", "tax", "updatedAt") SELECT "createdAt", "discount", "id", "receiptId", "stockId", "tax", "updatedAt" FROM "ReceiptEntry";
DROP TABLE "ReceiptEntry";
ALTER TABLE "new_ReceiptEntry" RENAME TO "ReceiptEntry";
CREATE UNIQUE INDEX "ReceiptEntry_id_key" ON "ReceiptEntry"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
