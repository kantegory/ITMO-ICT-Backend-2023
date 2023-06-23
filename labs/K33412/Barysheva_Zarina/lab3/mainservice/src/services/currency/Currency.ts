import Currency from '../../models/currency/Currency'
import CurrencyError from '../../errors/currency/Currency'

class CurrencyService {
    async getById(id: number) : Promise<Currency> {
        const currency = await Currency.findByPk(id)

        if (currency) return currency.toJSON()

        throw new CurrencyError('currency not found')
    }

    async create(currencyData: object) : Promise<Currency> {
        try {
            const currency = await Currency.create(currencyData)

            return currency.toJSON()
        } 
        catch (e: any) {
            throw new CurrencyError(e)
        }
    }

    async updateValue(id_: number, newValue: object) : Promise<Currency> {
        try {
            const currency = await Currency.update(newValue, {where : {id: id_}})

            return this.getById(id_)
        }
        catch(e: any) {
            throw new CurrencyError(e)
        }
    }

    async getAll() {
        const currency = await Currency.findAll()

        if (currency) return currency

        throw new CurrencyError('currency not found')
    }

    async filter(filter: string) {
        try {
            console.log(filter)
            const currency = await Currency.findAll({order : [["createdAt", filter]]})

            return currency
        }
        catch(e: any){

            throw new CurrencyError('smth wrong')
        }
    }
}

export default CurrencyService
