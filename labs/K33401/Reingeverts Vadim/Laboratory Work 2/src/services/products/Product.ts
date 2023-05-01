import { Product, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

class ProductService extends DbService {
    async getAll(): Promise<Product[]> {
        return this.db.product.findMany({
            include: {
                stocks: true,
            },
        });
    }

    async getById(id: Product["id"]): Promise<Product | null> {
        return this.db.product.findUnique({
            where: {
                id,
            },
            include: {
                stocks: true,
            },
        });
    }

    async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
        return this.db.product.create({
            data: data,
            include: {
                stocks: true,
            },
        });
    }

    async update(id: Product["id"], data: Prisma.ProductUncheckedUpdateInput): Promise<Product> {
        data.updatedAt = new Date().toJSON();

        return this.db.product.update({
            where: {
                id,
            },
            data: data,
            include: {
                stocks: true,
            },
        });
    }

    async delete(id: Product["id"]): Promise<Product> {
        return this.db.product.delete({
            where: {
                id,
            },
        });
    }
}

export default ProductService;
