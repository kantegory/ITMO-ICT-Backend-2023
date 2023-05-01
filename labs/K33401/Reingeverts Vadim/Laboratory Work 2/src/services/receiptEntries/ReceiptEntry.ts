import { ReceiptEntry, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

class ReceiptEntryService extends DbService {
    async getAll(): Promise<ReceiptEntry[]> {
        return this.db.receiptEntry.findMany({
            include: {
                receipt: true,
                stock: { include: { product: true } },
            },
        });
    }

    async getById(id: ReceiptEntry["id"]): Promise<ReceiptEntry | null> {
        return this.db.receiptEntry.findUnique({
            where: {
                id,
            },
            include: {
                receipt: true,
                stock: { include: { product: true } },
            },
        });
    }

    async create(data: Prisma.ReceiptEntryUncheckedCreateInput): Promise<ReceiptEntry> {
        const ReceiptEntry = await this.db.$transaction(async () => {
            const { stockId } = data;
            const stock = await this.db.stock.findUnique({
                where: { id: stockId },
                include: { receiptEntries: true },
            });

            if (!stock) {
                throw Error(`Stock with id ${stockId} does not exist`);
            }
            const boughtCount = stock.receiptEntries.length;
            const canBeBought = stock.quantity - boughtCount >= 1;

            if (!canBeBought) {
                throw Error(`Stock with id ${stockId} is out of stock`);
            }

            return this.db.receiptEntry.create({
                data: data,
                include: {
                    receipt: true,
                    stock: { include: { product: true } },
                },
            });
        });

        return ReceiptEntry;
    }

    async update(
        id: ReceiptEntry["id"],
        data: Prisma.ReceiptEntryUncheckedUpdateInput
    ): Promise<ReceiptEntry> {
        data.updatedAt = new Date().toJSON();

        return this.db.receiptEntry.update({
            where: {
                id,
            },
            data: data,
            include: {
                receipt: true,
                stock: { include: { product: true } },
            },
        });
    }

    async delete(id: ReceiptEntry["id"]): Promise<ReceiptEntry> {
        return this.db.receiptEntry.delete({
            where: {
                id,
            },
        });
    }
}

export default ReceiptEntryService;
