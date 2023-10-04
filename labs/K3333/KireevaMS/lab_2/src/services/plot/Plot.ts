import PlotError from "../../errors/plot/Plot";
import { Op } from 'sequelize';
import Currency from "../../models/currency/Currency";

class PlotService {
    byDate = async (startDate: Date, endDate: Date, currency_id: number): Promise<Currency[]> => {
        try {
            const prices = await Currency.findAll({
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

}

export default PlotService