import { Warehouse, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

class WarehouseService extends DbService {
    async getAll(): Promise<Warehouse[]> {
        return this.db.warehouse.findMany({
            include: {
                stocks: { include: { product: true } },
            },
        });
    }

    async getById(id: Warehouse["id"]): Promise<Warehouse | null> {
        return this.db.warehouse.findUnique({
            where: {
                id,
            },
            include: {
                stocks: { include: { product: true } },
            },
        });
    }

    async create(data: Prisma.WarehouseUncheckedCreateInput): Promise<Warehouse> {
        return this.db.warehouse.create({
            data: data,
            include: {
                stocks: { include: { product: true } },
            },
        });
    }

    async update(
        id: Warehouse["id"],
        data: Prisma.WarehouseUncheckedUpdateInput
    ): Promise<Warehouse> {
        data.updatedAt = new Date().toJSON();

        return this.db.warehouse.update({
            where: {
                id,
            },
            data: data,
            include: {
                stocks: { include: { product: true } },
            },
        });
    }

    async delete(id: Warehouse["id"]): Promise<Warehouse> {
        return this.db.warehouse.delete({
            where: {
                id,
            },
        });
    }
}

export default WarehouseService;
