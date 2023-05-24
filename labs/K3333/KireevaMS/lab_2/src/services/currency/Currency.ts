import Currency from "../../models/currency/Currency";
import CurrencyError from "../../errors/currency/Currency";
import currency from "../../errors/currency/Currency";
import { Op } from 'sequelize';
import {Sequelize} from "sequelize-typescript";

class CurrencyService {
    async getById(id: number) : Promise<Currency> {
        const currency = await Currency.findByPk(id)

        if (currency) return currency.toJSON()

        throw new CurrencyError('Not found!')
    }

    async create(currencyData: Partial<Currency>): Promise<Currency> {
        try {
            const currency = await Currency.create(currencyData)

            return currency.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new CurrencyError(errors)
        }
    }

    async getAll() {
        const currencies = await Currency.findAll()

        if (currency) return currencies

        throw new CurrencyError('Currencies are not found')
    }


    byName = async (name: string): Promise<Currency[]> => {
        try {
            const currencies = await Currency.findAll({
                where: {
                    name: name,
                },
            });
            return currencies;
        } catch (error) {
            throw new Error('Failed to fetch currencies by name.');
        }
    };


    async byDate(startDate: Date, endDate: Date): Promise<Currency[]> {
        try {
            const currencies = await Currency.findAll({
                attributes: ['name', 'price', [Sequelize.fn('MIN', Sequelize.col('createdAt')), 'firstCreatedAt']],
                group: ['name'],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                order: [[Sequelize.fn('MIN', Sequelize.col('createdAt')), 'ASC']],
            });
            return currencies;
        } catch (error) {
            throw new Error('Failed to retrieve currencies.');
        }
    }



}

export default CurrencyService