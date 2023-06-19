import CoinService from '../../services/wallet/Coin'

const TIME_INTERVAL_MAPPING: any = {
    h: 3600,
    d: 3600 * 24,
    w: 3600 * 24 * 7,
    m: 3600 * 24 * 30,
    y: 3600 * 24 * 365
}

class CoinController {
    private coinService: CoinService

    constructor() {
        this.coinService = new CoinService()
    }

    get = async (request: any, response: any) => {
        const {ticker} = request.params
        try {
            response.send(await this.coinService.getByTicker(ticker))
        } catch (e: any) {
            response.status(404).send({'detail': e.message})
        }
    }

    getAll = async (request: any, response: any) => {
        const time = request.query.time
        let seconds = null
        if (time) {
            seconds = TIME_INTERVAL_MAPPING[time]
        }
        if (seconds) {
            response.send(await this.coinService.getAllFilter(new Date(Date.now() - seconds * 1000)))
        } else {
            response.send(await this.coinService.getAll())
        }
    }

    price = async (request: any, response: any) => {
        const {ticker} = request.params
        try {
            response.send(await this.coinService.getPrice(ticker))
        } catch (e: any) {
            response.status(404).send({'detail': e.message})
        }
    }

    candles = async (request: any, response: any) => {
        const {ticker} = request.params
        const time = request.query.time
        let seconds = null
        if (time) {
            seconds = TIME_INTERVAL_MAPPING[time]
        }
        if (!seconds) {
            // Default is hour
            seconds = TIME_INTERVAL_MAPPING['h']
        }
        try {
            response.send(await this.coinService.getCandles(ticker, Math.floor(Date.now() / 1000) - seconds))
        } catch (e: any) {
            response.status(404).send({'detail': e.message})
        }
    }
}

export default CoinController
