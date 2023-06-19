import Good from '../../models/goods/Good'
import ConvertType from '../../middleware/convertType'

class GoodService {
    async getById(id: number) {
        const good = await Good.findByPk(id)

        if (good) return good.toJSON()

    }

    async get() {
        const goods = await Good.findAll();

        if (goods) return goods 
    }

    async create(goodData: any) {
        try {
            goodData = await ConvertType.convertInt(goodData, {count: goodData.count, price: goodData.price})

            const good = await Good.create(goodData)

            return good.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async update(id: number, goodData: any) {
        try {
            const good = await Good.findByPk(id)

            if (good) {
                const updateGood = await good.update(goodData)   

                return updateGood.toJSON()
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
        
    }

    async delete(id: number) {
        try {
            const good = await Good.findByPk(id)

            if (good) {
                const deletedGood = await good.destroy({where: {id: id}})

                return deletedGood
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }    
    }
}

export default GoodService