-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReceiptEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discount" REAL NOT NULL DEFAULT 0.0,
    "tax" REAL NOT NULL DEFAULT 0.10,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "receiptId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    CONSTRAINT "ReceiptEntry_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReceiptEntry_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReceiptEntry" ("createdAt", "discount", "id", "receiptId", "stockId", "tax", "updatedAt") SELECT "createdAt", "discount", "id", "receiptId", "stockId", "tax", "updatedAt" FROM "ReceiptEntry";
DROP TABLE "ReceiptEntry";
ALTER TABLE "new_ReceiptEntry" RENAME TO "ReceiptEntry";
CREATE UNIQUE INDEX "ReceiptEntry_id_key" ON "ReceiptEntry"("id");
CREATE TABLE "new_Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyPrice" DECIMAL NOT NULL DEFAULT 0,
    "sellPrice" DECIMAL NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("buyPrice", "createdAt", "id", "productId", "quantity", "sellPrice", "updatedAt", "warehouseId") SELECT "buyPrice", "createdAt", "id", "productId", "quantity", "sellPrice", "updatedAt", "warehouseId" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
