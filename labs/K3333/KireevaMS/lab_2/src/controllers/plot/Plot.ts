import PlotService from "../../services/plot/Plot";
import Plot from "../../models/plotData/CurrencyPrice";
import PlotError from "../../errors/plot/Plot";
import CurrencyPrice from "../../models/plotData/CurrencyPrice";

class PlotController {
    private plotService: PlotService;

    constructor() {
        this.plotService = new PlotService()
    }

    addPrice = async (request: any, response: any) => {
        const { body } = request

        try {
            const price : Plot|PlotError = await this.plotService.create(body)

            response.status(201).send(price)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    deletePrice = async (request: any, response: any) => {
        try {
            const { id } = request.params;

            const deletedCount = await CurrencyPrice.destroy({
                where: { id: id }
            });

            if (deletedCount === 0) {
                throw new PlotError(`Currency price with id ${id} not found`);
            } else {
                response.status(200).send(`Currency price with id ${id} was deleted`);
            }
        } catch (error: any) {
            response.status(404).send({ error: error.message });
        }
    };


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
