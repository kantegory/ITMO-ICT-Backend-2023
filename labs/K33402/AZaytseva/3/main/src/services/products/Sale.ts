import { Op, fn, col } from "sequelize";
import Sale from "../../models/products/Sale";

interface SaleCreateRequest {
    quantity: number;
    price: number;
    productId: number;
    dateOfSale: Date;
}

interface SoldRequestParams {
    productId: number;
    dateFrom?: Date;
    dateTo?: Date;
}

class SaleRepository {
    async getAll(productId?: number) : Promise<Sale[]> {
        if (productId) {
            const sales = await Sale.findAll({
                where: {
                    productId,
                }
            })
            return sales
        } else {
            const sales = await Sale.findAll()
            return sales
        }
    }

    async getSoldRevenue(params: Partial<SoldRequestParams>): Promise<number> {
        let revenue;

        if (params.productId) {
            revenue = await Sale.sum('price', {
                where: {
                    productId: params.productId,
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            revenue = await Sale.sum('price', {
                where: {
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return revenue
    }

    async getSoldAmount(params: Partial<SoldRequestParams>): Promise<number> {
        let amount;

        if (params.productId) {
            amount = await Sale.sum('quantity', {
                where: {
                    productId: params.productId,
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            amount = await Sale.sum('quantity', {
                where: {
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return amount
    }

    async getSalesRevenueGroupedByDay(params: Partial<SoldRequestParams>): Promise<Sale[]> {
        let sales;

        if (params.productId) {
            sales = await Sale.findAll({
                attributes: [
                    'dateOfSale',
                    [fn('sum', col('price')), 'revenue'],
                ],
                group: 'dateOfSale',
                where: {
                    productId: params.productId,
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            sales = await Sale.findAll({
                attributes: [
                    'dateOfSale',
                    [fn('sum', col('price')), 'revenue'],
                ],
                group: 'dateOfSale',
                where: {
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return sales
    }

    async getSalesAmountGroupedByDay(params: Partial<SoldRequestParams>): Promise<Sale[]> {
        let sales;

        if (params.productId) {
            sales = await Sale.findAll({
                attributes: [
                    'dateOfSale',
                    [fn('sum', col('quantity')), 'amount'],
                ],
                group: 'dateOfSale',
                where: {
                    productId: params.productId,
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            sales = await Sale.findAll({
                attributes: [
                    'dateOfSale',
                    [fn('sum', col('quantity')), 'amount'],
                ],
                group: 'dateOfSale',
                where: {
                    dateOfSale: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return sales
    }

    async getById(id: number) : Promise<Sale> {
        const sale = await Sale.findByPk(id)

        if (sale) {
          return sale.toJSON()
        }

        throw new Error('Not found!')
    }

    async create(supplyData: Partial<SaleCreateRequest>): Promise<Sale> {
        const sale = await Sale.create(supplyData)
        return sale.toJSON()
    }

    async deleteById(id: number): Promise<boolean> {
        const deletedRows = await Sale.destroy({ where: { id } })
        return deletedRows > 0;
    }

    async deleteByProductId(productId: number): Promise<boolean> {
        const deletedRows = await Sale.destroy({ where: { productId } })
        return deletedRows > 0;
    }

    async updateById(id: number, saleData: Partial<SaleCreateRequest>): Promise<boolean> {
        const affectedCount = await Sale.update(saleData, { where: { id } })
        return affectedCount[0] > 0;
    }
}

export default SaleRepository