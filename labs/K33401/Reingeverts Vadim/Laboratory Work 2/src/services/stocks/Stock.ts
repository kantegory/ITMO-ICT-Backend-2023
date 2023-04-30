import { Stock, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

class StockService extends DbService {
    async getAll(): Promise<Stock[]> {
        return this.db.stock.findMany({
            include: {
                product: true,
                warehouse: true,
            },
        });
    }

    async getById(id: Stock["id"]): Promise<Stock | null> {
        return this.db.stock.findUnique({
            where: {
                id,
            },
            include: {
                product: true,
                warehouse: true,
            },
        });
    }

    async create(data: Prisma.StockUncheckedCreateInput): Promise<Stock> {
        return this.db.stock.create({
            data: data,
            include: {
                product: true,
                warehouse: true,
            },
        });
    }

    async update(id: Stock["id"], data: Prisma.StockUncheckedUpdateInput): Promise<Stock> {
        data.updatedAt = new Date().toJSON();

        return this.db.stock.update({
            where: {
                id,
            },
            data: data,
            include: {
                product: true,
                warehouse: true,
            },
        });
    }

    async delete(id: Stock["id"]): Promise<Stock> {
        return this.db.stock.delete({
            where: {
                id,
            },
        });
    }
}

export default StockService;
