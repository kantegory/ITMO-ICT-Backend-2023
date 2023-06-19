import axios from 'axios'
import APIError from '../errors/APIError'


export default async (ticker: string, from: number): Promise<any> => {
    const res = await axios.get(`https://api.cryptowat.ch/markets/ftx/${ticker}usd/ohlc?periods=60&after=${from}`)
    if (res.status != 200) {
        throw new APIError('Failed to get current price')
    }
    return res.data['result']['60']
}
