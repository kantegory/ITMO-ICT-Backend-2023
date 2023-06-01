import CurrencyService from "../../services/currency/CurrencyService";

class CurrencyController {
    private currencyService: CurrencyService;

    constructor() {
        this.currencyService = new CurrencyService();
    }

    loadAll = async (request: any, response: any) => {
        try {
            await this.currencyService.loadAll();
            response.status(200).send("OK!")
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const currencies = await this.currencyService.getAll();
            response.send(currencies)
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const currency = await this.currencyService.getById(request.params.id);
            response.send(currency);
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getByName = async (request: any, response: any) => {
        try {
            const {name} = request.body
            if (!name) {
                return response.status(400).send('Currency name is missing');
            }
            const currencies = await this.currencyService.search(name)
            response.send(currencies)
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }

    filterByDate = async (request: any, response: any) => {
        try {
            const {name, startDate, endDate} = request.body;
            const currencies = await this.currencyService.filterByDate(name, startDate, endDate);
            response.send(currencies)
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }

}

export default CurrencyController;