import { Op } from "sequelize";
import Supply from "../../models/products/Supply";

interface SupplyCreateRequest {
  count: number;
  productId: number;
  dateSupply: Date;
}

interface SuppliedRequestParams {
    productId: number;
    dateFrom?: Date;
    dateTo?: Date;
}

class SupplyService {
    async getAll() : Promise<Supply[]> {
        const supplies = await Supply.findAll()

        return supplies
    }

    async getSuppliedAmount(params: SuppliedRequestParams): Promise<number> {
        const amount = await Supply.sum('count', {
            where: {
                productId: params.productId,
                dateSupply: {
                    [Op.gte]: params.dateFrom ?? new Date(0),
                    [Op.lte]: params.dateTo ?? new Date(),
                }
            }
        })

        return amount
    }

    async getById(id: number) : Promise<Supply> {
        const supply = await Supply.findByPk(id)

        if (supply) {
          return supply.toJSON()
        }

        throw new Error('Not found!')
    }

    async create(supplyData: Partial<SupplyCreateRequest>): Promise<Supply> {
        const supply = await Supply.create(supplyData)
        return supply.toJSON()
    }

    async deleteById(id: number): Promise<boolean> {
        const deletedRows = await Supply.destroy({ where: { id } })
        return deletedRows > 0;
    }

    async deleteByProductId(productId: number): Promise<boolean> {
        const deletedRows = await Supply.destroy({ where: { productId } })
        return deletedRows > 0;
    }

    async updateById(id: number, supplyData: Partial<SupplyCreateRequest>): Promise<boolean> {
        const affectedCount = await Supply.update(supplyData, { where: { id } })
        return affectedCount[0] > 0;
    }
}

export default SupplyService