import Currency from '../../models/currency/Currency'
import CurrencyService from '../../services/currency/Currency'
import CurrencyError from '../../errors/currency/Currency'
import HistoryService from '../../services/history/History'
import HistoryError from '../../errors/history/History'
import History from '../../models/history/History'


class CurrencyController {
    private currencyService: CurrencyService

    constructor() {
        this.currencyService = new CurrencyService()
    }

    get = async (request: any, response: any) => {
        try {
            const currency: Currency | CurrencyError = await this.currencyService.getById(
                Number(request.params.id)
            )

            response.send(currency)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const currency: Currency[] | CurrencyError = await this.currencyService.getAll()

            response.status(200).send(currency)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {

            const historyService = new HistoryService()

            const currency : Currency|CurrencyError = await this.currencyService.create(body)

            const history : History = await historyService.create({"currencyId": Number(currency.id), "value": body.value, "createdAt": currency.createdAt})
            console.log(history);
            

            response.status(201).send(currency)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    filter = async (request: any, response: any) => {
        try{
            const currency: Currency[] | CurrencyError = await this.currencyService.filter(
                String(request.params.filter)
            )

            response.status(200).send(currency)
        }
        catch(e: any){
            response.status(404).send({ "error": e.message })
        }
    }

    updateValue = async (request: any, response: any) => {
        const body = request.body
        const currencyId = request.params.id

        console.log(body)
        
        try {

            const historyService = new HistoryService()

            const currency: Currency = await this.currencyService.updateValue(
                currencyId, body
            )
            const history : History = await historyService.create({"currencyId": currencyId, "value": body.value, "createdAt": currency.updatedAt})


            response.status(200).send(currency)
        }
        catch(e: any){
            response.status(404).send({ "error": e.message })
        }
    }

}

export default CurrencyController
