import axios from 'axios'
import APIError from '../errors/APIError'


export default async (ticker: string): Promise<number> => {
    const res = await axios.get(`https://api.cryptowat.ch/markets/ftx/${ticker}usd/price`)
    if (res.status != 200) {
        throw new APIError('Failed to get current price')
    }
    return res.data['result']['price']
}
