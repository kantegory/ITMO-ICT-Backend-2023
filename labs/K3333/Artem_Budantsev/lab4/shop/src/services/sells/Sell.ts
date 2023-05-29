import Sell from '../../models/sells/Sell'
import Good from '../../models/goods/Good'
import ConvertType from '../../middleware/convertType'
import ProcessData from '../../middleware/processData'

class SellService {
    async get() {
        const users = await Sell.findAll();

        if (users) return users 
    }

    async create(sellData: any) {
        try {
            const good = await Good.findOne({where: {name: sellData.name }})

            if (good){
                sellData = await ConvertType.convertInt(sellData, {count: sellData.count})
                if (good.count >= sellData.count) {
                    await good.decrement('count', {by: sellData.count})

                    sellData = await ProcessData.processSell(sellData, good)

                    const sell = await Sell.create(sellData)

                    return sell.toJSON()
                }

            }   
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async update(id: number, sellData: any) {
        try {
            const oldSell = await Sell.findByPk(id)

            if (oldSell) {
                const good = await Good.findOne({where: {name: sellData.name }})
                
                if (good) {
                    sellData = await ConvertType.convertInt(sellData, {count: sellData.count})

                    if (oldSell.goodId != good.id) {
                        if (good.count >= sellData.count) {

                            const oldGood = await Good.findByPk(oldSell.goodId)
                            if (oldGood) {
                                await oldGood.increment('count', {by: oldSell.count})

                                await good.decrement('count', {by: sellData.count})
                                sellData = await ProcessData.processSell(sellData, good)
                            }
                        }
                    }
                    else {
                        let differenceCount = oldSell.count - sellData.count

                        if (differenceCount > 0)  await good.increment('count', {by: differenceCount})

                        if (differenceCount < 0) {
                            differenceCount = -differenceCount 
                            if (good.count >= differenceCount) await good.decrement('count', {by: differenceCount})
                        }
                        sellData = await ProcessData.processSell(sellData,good)
                    }
                }
                const updateSell = await oldSell.update(sellData)   

                return updateSell.toJSON()
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async earning() {
        return Sell.sum('price'); 
    }

    async count() {
        return Sell.sum('count'); 
    }

    async earningByGood(name: string) {
        const good = await Good.findOne({where: {name: name }})
        if (good) return  Sell.sum('price', {where: {goodId: good.id}})
    }

    async countByGood(name: string) {
        const good = await Good.findOne({where: {name: name }})
        if (good) return Sell.sum('count', {where: {goodId: good.id}}); 
    }

}

export default SellService