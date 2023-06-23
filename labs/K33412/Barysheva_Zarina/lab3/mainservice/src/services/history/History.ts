import History from '../../models/history/History'
import HistoryError from '../../errors/history/History'

class HistoryService {
    async create(historyData: object) : Promise<History> {
        try {
            const history = await History.create(historyData)

            return history.toJSON()
        } 
        catch (e: any) {
            throw new HistoryError(e)
        }
    }

    async getByCurrency(currencyId: number) {
        const history = await History.findAll({where : {currencyId: currencyId}, order : [[ "createdAt", "ASC"]]})

        if (history) return history

        throw new HistoryError('currency not found')
    }
}

export default HistoryService
