import Goods from '../../models/goods/Goods'
import sequelize from '../../providers/db'

const goodsRepository = sequelize.getRepository(Goods)

class GoodsService {
    async getById(id: number): Promise<Goods> {
        const goods = await goodsRepository.findOne({ where: { 'articul': id } })
        if (goods) return goods
        throw new Error(`Goods with id ${id} not found`)
    }

    async create(goodsData: Partial<Goods>): Promise<Goods> {
        try {
            const goods = await goodsRepository.create(goodsData)
            return goods.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async update(id: number, goodsData: Partial<Goods>): Promise<Goods> {
        try {
            const goods = await goodsRepository.findOne({ where: { 'articul': id } })

            if (goods) {
                await goods.update(goodsData)
                return goods.toJSON()
            }
            throw new Error(`Goods with id ${id} not found`)
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async delete(id: number): Promise<void> {
        const goods = await goodsRepository.findOne({ where: { 'articul': id } })
        if (goods) {
            await goods.destroy()
            return
        }
        throw new Error(`Goods with id ${id} not found`)
    }

    async getCountGoods(): Promise<any> {
        const result = await goodsRepository.findAll({
            attributes: ['name', [sequelize.fn('SUM', sequelize.col('count')), 'total_count']],
            group: ['name']
        });
        return result;
    }
}

export default GoodsService    