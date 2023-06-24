import { Op, fn, col } from "sequelize";
import Realization from "../../models/products/Realization";

interface RealizationCreateRequest {
    count: number;
    price: number;
    productId: number;
    dateRealization: Date;
}

interface SoldRequestParams {
    productId: number;
    dateFrom?: Date;
    dateTo?: Date;
}

class RealizationService {
    async getAll() : Promise<Realization[]> {
        const realizations = await Realization.findAll()

        return realizations
    }

    async getSoldRevenue(params: Partial<SoldRequestParams>): Promise<number> {
        let revenue;

        if (params.productId) {
            revenue = await Realization.sum('price', {
                where: {
                    productId: params.productId,
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            revenue = await Realization.sum('price', {
                where: {
                    dateRealization: {
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
            amount = await Realization.sum('count', {
                where: {
                    productId: params.productId,
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            amount = await Realization.sum('count', {
                where: {
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return amount
    }

    async getRealizationsRevenueGroupedByDay(params: Partial<SoldRequestParams>): Promise<Realization[]> {
        let realizations;

        if (params.productId) {
            realizations = await Realization.findAll({
                attributes: [
                    'dateRealization',
                    [fn('sum', col('price')), 'revenue'],
                ],
                group: 'dateRealization',
                where: {
                    productId: params.productId,
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            realizations = await Realization.findAll({
                attributes: [
                    'dateRealization',
                    [fn('sum', col('price')), 'revenue'],
                ],
                group: 'dateRealization',
                where: {
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return realizations
    }

    async getRealizationsAmountGroupedByDay(params: Partial<SoldRequestParams>): Promise<Realization[]> {
        let realizations;

        if (params.productId) {
            realizations = await Realization.findAll({
                attributes: [
                    'dateRealization',
                    [fn('sum', col('count')), 'amount'],
                ],
                group: 'dateRealization',
                where: {
                    productId: params.productId,
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        } else {
            realizations = await Realization.findAll({
                attributes: [
                    'dateRealization',
                    [fn('sum', col('count')), 'amount'],
                ],
                group: 'dateRealization',
                where: {
                    dateRealization: {
                        [Op.gte]: params.dateFrom ?? new Date(0),
                        [Op.lte]: params.dateTo ?? new Date(),
                    }
                }
            })
        }

        return realizations
    }

    async getById(id: number) : Promise<Realization> {
        const realization = await Realization.findByPk(id)

        if (realization) {
          return realization.toJSON()
        }

        throw new Error('Not found!')
    }

    async create(supplyData: Partial<RealizationCreateRequest>): Promise<Realization> {
        const realization = await Realization.create(supplyData)
        return realization.toJSON()
    }

    async deleteById(id: number): Promise<boolean> {
        const deletedRows = await Realization.destroy({ where: { id } })
        return deletedRows > 0;
    }

    async deleteByProductId(productId: number): Promise<boolean> {
        const deletedRows = await Realization.destroy({ where: { productId } })
        return deletedRows > 0;
    }

    async updateById(id: number, realizationData: Partial<RealizationCreateRequest>): Promise<boolean> {
        const affectedCount = await Realization.update(realizationData, { where: { id } })
        return affectedCount[0] > 0;
    }
}

export default RealizationService