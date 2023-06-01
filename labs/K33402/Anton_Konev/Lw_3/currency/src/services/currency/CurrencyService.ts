import Currency from "../../models/currency/Currency";
import axios from "axios";
import CurrencyError from "../../errors/currency/CurrencyError";
import {Op} from "sequelize";

class CurrencyService {
    async loadAll() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=rub&per_page=20&page=1');
            const data = response.data;
            const currencies = data.map((currency: any) => ({
                        id: currency.id,
                        name: currency.name,
                        price: currency.current_price,
                        date: currency.atl_date
                    }
                )
            )
            await Currency.bulkCreate(currencies)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new CurrencyError(errors)
        }
    }

    async getAll() {
        const currencies = await Currency.findAll()

        if (currencies) return currencies;

        throw  new CurrencyError('No currencies found')
    }

    async getById(id: string) {
        const currency = await Currency.findByPk(id);

        if (currency) return currency;

        throw new CurrencyError(`Currency with id = ${id} not found`)
    }

    async search(name: string) {
        try {
            const currencies = await Currency.findAll({
                where: {
                    name: name,
                }
            });
            if (currencies) return currencies;
        } catch (e: any) {
            throw new Error(`Failed to find currency ${name}`)
        }
    }

    async filterByDate(name: string, startDate: Date, endDate: Date) {
        try {
            const currencies = await Currency.findAll({
                where: {
                    date: {
                        [Op.between]: [startDate, endDate]
                    },
                    name: name
                }
            })
            if(currencies) return currencies;
        }catch (e: any){
            throw new Error(`Failed to find currencies between dates`)
        }
    }
}

export default CurrencyService;