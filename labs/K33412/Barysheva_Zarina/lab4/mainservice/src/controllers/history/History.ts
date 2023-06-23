import History from '../../models/history/History'
import HistoryService from '../../services/history/History'
import HistoryError from '../../errors/history/History'


class HistoryController {
    private historyService: HistoryService

    constructor() {
        this.historyService = new HistoryService()
    }

    get = async (request: any, response: any) => {
        const id = request.params.id
        console.log(id);
        
        try {
            const history: History[] | HistoryError = await this.historyService.getByCurrency(
                Number(id)
            )

            response.send(history)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

}

export default HistoryController
