import CurrencyError from "../../errors/currency/Currency";
import Currency from "../../models/currency/Currency";
import CurrencyService from "../../services/currency/Currency";

class CurrencyController {
    private currencyService: CurrencyService;

    constructor() {
        this.currencyService = new CurrencyService()
    }

    get = async (request: any, response: any) => {
        try {
            const currency: Currency|CurrencyError = await this.currencyService.getById(
                Number(request.params.id)
            )

            response.send(currency)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const currency : Currency|CurrencyError = await this.currencyService.create(body)

            response.status(201).send(currency)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }


   getAll = async (request: any, response: any) => {
        try {
            const currencies = await this.currencyService.getAll()

            response.send(currencies)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    deleteById = async (request: any, response: any)=> {
        try {
            const { id } = request.params;

            const deletedCount = await Currency.destroy({
                where: {id: id}
            });

            if (deletedCount === 0) {
                throw new CurrencyError(`Currency with id ${id} not found`);
            }
            else {
                response.send(`Currency with id ${id} was deleted`)
            }

            response.status(204).send();
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    byName = async (request: any, response: any) => {
        try {
            const { name } = request.query;
            if (!name) {
                return response.status(400).send('Currency name is required.');
            }

            const currencies = await this.currencyService.byName(name as string);
            response.send(currencies);
        } catch (error) {
            response.status(500).send('An error occurred while fetching currencies by name.');
        }
    };


    byDate = async (request: any, response: any) => {
        try {
            const { startDate,endDate } = request.query;
            if (!startDate || !endDate) {
                return response.status(400).send('Params are required required.');
            }
            const startDateObj = new Date(startDate as string);
            const endDateObj = new Date(endDate as string);
            const currencies = await this.currencyService.byDate(startDateObj,endDateObj);
            response.send(currencies);
        } catch (error) {
            response.status(500).send('An error occurred while filtering data by date.');
        }
    };
}

export default CurrencyController
