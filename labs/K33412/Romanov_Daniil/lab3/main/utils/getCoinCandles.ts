import axios from 'axios'

export default async(ticker: string, after: number): Promise<any> => {
    const result = await axios.get(`https://api.cryptowat.ch/markets/ftx/${ticker}usd/ohlc?periods=3600&after=${after}`)

    return result.data['result']['3600']
}