import { Receipt, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

type ReceiptNested = Prisma.ReceiptGetPayload<{
    include: {
        receiptEntries: { include: { stock: { include: { product: true } } } };
    };
}>;

class ReceiptService extends DbService {
    include = {
        receiptEntries: { include: { stock: { include: { product: true } } } },
    };

    async getAll(): Promise<ReceiptNested[]> {
        return this.db.receipt.findMany({
            include: this.include,
        });
    }

    async getById(id: Receipt["id"]): Promise<ReceiptNested | null> {
        return this.db.receipt.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
    }

    async create(data: Prisma.ReceiptUncheckedCreateInput): Promise<ReceiptNested> {
        return this.db.receipt.create({
            data: data,
            include: this.include,
        });
    }

    async update(
        id: Receipt["id"],
        data: Prisma.ReceiptUncheckedUpdateInput
    ): Promise<ReceiptNested> {
        data.updatedAt = new Date().toJSON();

        return this.db.receipt.update({
            where: {
                id,
            },
            data: data,
            include: this.include,
        });
    }

    async delete(id: Receipt["id"]): Promise<ReceiptNested> {
        return this.db.receipt.delete({
            where: {
                id,
            },
            include: this.include,
        });
    }
}

export default ReceiptService;
