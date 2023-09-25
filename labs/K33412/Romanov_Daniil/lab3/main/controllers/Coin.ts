import CoinService from "../services/Coin";

class CoinController {
    private coinService: CoinService

    constructor() {
        this.coinService = new CoinService()
    }

    get = async (request: any, response: any) => {
        const { ticker } = request.params

        try {
            response.send(await this.coinService.getByTicker(ticker))
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getAll = async (request: any, response: any) => {
        const days = request.query.days

        if (days) {
            response.send(await this.coinService.getAllFiltered(new Date(Date.now() - days * 24 * 60 * 60 * 1000)))
        } else {
            response.send(await this.coinService.getAll())
        }
    }

    getPrice = async (request: any, response: any) => {
        const { ticker } = request.params
        try {
            response.send(await this.coinService.getPrice(ticker))
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getCandles = async (request: any, response: any) => {
        const { ticker } = request.params
        let seconds = request.query.seconds

        if (seconds) {
            try {
                response.send(await this.coinService.getCandles(ticker, Math.floor(Date.now() / 1000) - seconds))
            } catch (error: any) {
                response.status(404).send({"error": error.message})
            }
        } else {
            seconds = 3600

            try {
                response.send(await this.coinService.getCandles(ticker, Math.floor(Date.now() / 1000) - seconds))
            } catch (error: any) {
                response.status(404).send({"error": error.message})
            }
        }
    }
}

export default CoinController