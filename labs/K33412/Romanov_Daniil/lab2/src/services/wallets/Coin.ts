import Coin from "../../models/wallets/Coin";
import APIError from "../../errors/APIError";
import getCoinPrice from "../../utils/getCoinPrice";
import getCoinCandles from "../../utils/getCoinCandles";
import {Op} from "sequelize";

class CoinService {
    async getByTicker(ticker: string): Promise<Coin> {
        const coin = await Coin.findByPk(ticker)

        if (coin) {
            return coin.toJSON()
        }

        throw new APIError('Not found')
    }

    async getAll(): Promise<Coin[]> {
        const coins = await Coin.findAll()

        return coins
    }

    async getAllFiltered(from: Date): Promise<Coin[]> {
        const coins = await Coin.findAll({ where: { createdAt: {[Op.gte]: from}}})

        return coins
    }

    async getPrice(ticker: string): Promise<{ price: number }> {
        const coin = await Coin.findByPk(ticker)

        if (coin) {
            const price = await getCoinPrice(ticker)

            return { price: price }
        }

        throw new APIError('Not Found')
    }

    async getCandles(ticker: string, after: number): Promise<{ candles: any }> {
        const coin = await Coin.findByPk(ticker)

        if (coin) {
            const candles = await getCoinCandles(ticker, after)

            return { candles: candles }
        }

        throw new APIError('Not Found')
    }
}

export default CoinService