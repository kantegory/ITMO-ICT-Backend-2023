import { Product, Prisma } from "@prisma/client";

import DbService from "~/services/DbService";

type ProductNested = Prisma.ProductGetPayload<{
    include: {
        stocks: { include: { receiptEntries: true } };
    };
}>;
class ProductService extends DbService {
    include = {
        stocks: { include: { receiptEntries: true } },
    };

    async getAll(): Promise<ProductNested[]> {
        return this.db.product.findMany({
            include: this.include,
        });
    }

    async getById(id: Product["id"]): Promise<ProductNested | null> {
        return this.db.product.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
    }

    async create(data: Prisma.ProductUncheckedCreateInput): Promise<ProductNested> {
        return this.db.product.create({
            data: data,
            include: this.include,
        });
    }

    async update(
        id: Product["id"],
        data: Prisma.ProductUncheckedUpdateInput
    ): Promise<ProductNested> {
        data.updatedAt = new Date().toJSON();

        return this.db.product.update({
            where: {
                id,
            },
            data: data,
            include: this.include,
        });
    }

    async delete(id: Product["id"]): Promise<ProductNested> {
        return this.db.product.delete({
            where: {
                id,
            },
            include: this.include,
        });
    }

    async getProductSales(where?: Prisma.ProductWhereInput) {
        const products = await this.db.product.findMany({
            where,
            include: this.include,
        });

        const productSales = products.map((product) => {
            const { stocks, createdAt, updatedAt, ...productData } = product;

            const profits = stocks
                .map((stock) => {
                    const { buyPrice, sellPrice } = stock;

                    return stock.receiptEntries.map((receiptEntry) => {
                        const { discount, tax } = receiptEntry;
                        const finalSellPrice = sellPrice.times(1 - discount).times(1 - tax);
                        const profit = finalSellPrice.minus(buyPrice);
                        return profit;
                    });
                })
                .flat();
            const totalSoldCount = profits.length;

            let totalProfit = new Prisma.Decimal(0);
            if (profits.length) {
                totalProfit = Prisma.Decimal.sum(...profits);
            }

            const salesEntry = { ...productData, profits, totalSoldCount, totalProfit };
            return salesEntry;
        });
        return productSales;
    }
    async getDistinctValues(column: keyof Product) {
        const distictCategories = await this.db.product.findMany({
            select: { [column]: true },
            where: {},
            distinct: [column],
        });
        console.log("distictCategories", distictCategories);

        return distictCategories.map((categoryObj) => Object.values(categoryObj)[0]);
    }
}

export default ProductService;
