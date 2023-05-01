import { Receipt, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

class ReceiptService extends DbService {
    async getAll(): Promise<Receipt[]> {
        return this.db.receipt.findMany({
            include: {
                receiptEntries: { include: { stock: { include: { product: true } } } },
            },
        });
    }

    async getById(id: Receipt["id"]): Promise<Receipt | null> {
        return this.db.receipt.findUnique({
            where: {
                id,
            },
            include: {
                receiptEntries: { include: { stock: { include: { product: true } } } },
            },
        });
    }

    async create(data: Prisma.ReceiptUncheckedCreateInput): Promise<Receipt> {
        return this.db.receipt.create({
            data: data,
            include: {
                receiptEntries: { include: { stock: { include: { product: true } } } },
            },
        });
    }

    async update(id: Receipt["id"], data: Prisma.ReceiptUncheckedUpdateInput): Promise<Receipt> {
        data.updatedAt = new Date().toJSON();

        return this.db.receipt.update({
            where: {
                id,
            },
            data: data,
            include: {
                receiptEntries: { include: { stock: { include: { product: true } } } },
            },
        });
    }

    async delete(id: Receipt["id"]): Promise<Receipt> {
        return this.db.receipt.delete({
            where: {
                id,
            },
        });
    }
}

export default ReceiptService;
