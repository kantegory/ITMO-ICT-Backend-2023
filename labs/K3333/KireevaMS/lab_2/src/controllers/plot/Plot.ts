import PlotService from "../../services/plot/Plot";
import Plot from "../../models/currency/Currency";
import PlotError from "../../errors/plot/Plot";
import Currency from "../../models/currency/Currency";

class PlotController {
    private plotService: PlotService;

    constructor() {
        this.plotService = new PlotService()
    }


    oneYear = async (request: any, response: any) => {
        try {
            const { currency_id } = request.query;

            if (!currency_id) {
                return response.status(400).send('Currency id is required.');
            }

            const endDate: Date = new Date();
            const startDate: Date = new Date();
            startDate.setFullYear(endDate.getFullYear() - 1);

            const currencies = await this.plotService.byDate(startDate,endDate,currency_id as number);
            response.send(currencies);
        } catch (error) {
            response.status(500).send('An error occurred while loading data.');
        }
    };

    oneMonth = async (request: any, response: any) => {
        try {
            const { currency_id } = request.query;

            if (!currency_id) {
                return response.status(400).send('Currency id is required.');
            }

            const endDate: Date = new Date();
            const startDate: Date = new Date();
            startDate.setMonth(endDate.getMonth() - 1);


            const currencies = await this.plotService.byDate(startDate,endDate,currency_id as number);
            response.send(currencies);
        } catch (error) {
            response.status(500).send('An error occurred while loading data.');
        }
    };
}

export default PlotController
