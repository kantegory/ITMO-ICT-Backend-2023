import {Op} from 'sequelize'
import Coin from '../../models/wallet/Coin'
import APIError from '../../errors/APIError'
import getCurrentPrice from '../../utils/getCurrentPrice'
import getCandles from '../../utils/getCandles'


class CoinService {
    async getByTicker(ticker: string): Promise<Coin | APIError> {
        const coin = await Coin.findByPk(ticker)
        if (coin) {
            return coin.toJSON()
        }
        throw new APIError('Coin not found')
    }

    async getAll(): Promise<Coin[]> {
        return await Coin.findAll()
    }

    async getAllFilter(from: Date): Promise<Coin[]> {
        return await Coin.findAll({
            where: {
                createdAt: {[Op.gte]: from}
            }
        })
    }

    async getPrice(ticker: string): Promise<{ price: number } | APIError> {
        // Get only to check
        const coin = await Coin.findByPk(ticker)
        if (coin) {
            return {price: await getCurrentPrice(ticker)}
        }
        throw new APIError('Coin not found')
    }

    async getCandles(ticker: string, from: number): Promise<{ candles: any } | APIError> {
        const coin = await Coin.findByPk(ticker)
        if (coin) {
            return {candles: await getCandles(ticker, from)}
        }
        throw new APIError('Coin not found')
    }
}

export default CoinService
