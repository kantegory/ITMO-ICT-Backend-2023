import { Warehouse, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

type WarehouseNested = Prisma.WarehouseGetPayload<{
    include: {
        stocks: { include: { product: true } };
    };
}>;
class WarehouseService extends DbService {
    include = {
        stocks: { include: { product: true } },
    };

    async getAll(): Promise<WarehouseNested[]> {
        return this.db.warehouse.findMany({
            include: this.include,
        });
    }

    async getById(id: Warehouse["id"]): Promise<WarehouseNested | null> {
        return this.db.warehouse.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
    }

    async create(data: Prisma.WarehouseUncheckedCreateInput): Promise<WarehouseNested> {
        return this.db.warehouse.create({
            data: data,
            include: this.include,
        });
    }

    async update(
        id: Warehouse["id"],
        data: Prisma.WarehouseUncheckedUpdateInput
    ): Promise<WarehouseNested> {
        data.updatedAt = new Date().toJSON();

        return this.db.warehouse.update({
            where: {
                id,
            },
            data: data,
            include: this.include,
        });
    }

    async delete(id: Warehouse["id"]): Promise<WarehouseNested> {
        return this.db.warehouse.delete({
            where: {
                id,
            },
            include: this.include,
        });
    }
}

export default WarehouseService;
