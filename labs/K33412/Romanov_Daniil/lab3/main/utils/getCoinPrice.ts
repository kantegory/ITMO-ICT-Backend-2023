import axios from 'axios'
import APIError from "../errors/APIError";

export default async (ticker: string): Promise<number> => {
    const result = await axios.get(`https://api.cryptowat.ch/markets/ftx/${ticker}usd/price`)

    return result.data['result']['price']
}
