import { Stock, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

type StockNested = Prisma.StockGetPayload<{
    include: {
        product: true;
        warehouse: true;
    };
}>;
class StockService extends DbService {
    include = {
        product: true,
        warehouse: true,
    };

    async getAll(): Promise<StockNested[]> {
        return this.db.stock.findMany({
            include: this.include,
        });
    }

    async getById(id: Stock["id"]): Promise<StockNested | null> {
        return this.db.stock.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
    }

    async create(data: Prisma.StockUncheckedCreateInput): Promise<StockNested> {
        return this.db.stock.create({
            data: data,
            include: this.include,
        });
    }

    async update(id: Stock["id"], data: Prisma.StockUncheckedUpdateInput): Promise<StockNested> {
        data.updatedAt = new Date().toJSON();

        return this.db.stock.update({
            where: {
                id,
            },
            data: data,
            include: this.include,
        });
    }

    async delete(id: Stock["id"]): Promise<StockNested> {
        return this.db.stock.delete({
            where: {
                id,
            },
            include: this.include,
        });
    }
}

export default StockService;
