import PlotError from "../../errors/plot/Plot";
import { Op } from 'sequelize';
import CurrencyPrice from "../../models/plotData/CurrencyPrice";

class PlotService {
    byDate = async (startDate: Date, endDate: Date, currency_id: number): Promise<CurrencyPrice[]> => {
        try {
            const prices = await CurrencyPrice.findAll({
                where: {
                    currencyId:  currency_id,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    },
                },
            });
            return prices;
        } catch (error) {
            throw new Error('Failed to load data.');
        }
    };

    async create(currencyData: Partial<CurrencyPrice>): Promise<CurrencyPrice> {
        try {
            const price = await CurrencyPrice.create(currencyData)

            return price.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new PlotError(errors)
        }
    }
}

export default PlotService