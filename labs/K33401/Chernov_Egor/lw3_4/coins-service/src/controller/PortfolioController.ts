import { Request, Response } from "express"
import PortfolioService from "../service/PortfolioService"
import CoinService from "../service/CoinService"
import checkToken from "../util/checkToken";


class PortfolioController {
    private portfolioService: PortfolioService
    private coinService: CoinService

    constructor() {
        this.portfolioService = new PortfolioService()
        this.coinService = new CoinService()
    }

    getAllPortfolios = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization!.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const portfolios = await this.portfolioService.getAll()
            if (portfolios.length !== 0) {
                response.status(200).send(portfolios)
            } else {
                response.status(204).send(portfolios)
            }
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    getAllPortfoliosByUser = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization!.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const userId = decoded.payload.sub.toString()
            const user = await this.userService.get(userId)
            const portfolios = await this.portfolioService.getAllByUser(user)
            if (portfolios.length !== 0) {
                response.status(200).send(portfolios)
            } else {
                response.status(204).send(portfolios)
            }
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    getPortfolio = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization!.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const { coinId } = request.query
            const userId = decoded.payload.sub
            const user = await this.userService.get(String(userId))
            const coin = await this.coinService.get(String(coinId))
            const portfolio = await this.portfolioService.get(user, coin)
            response.status(200).send(portfolio)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    deletePortfolio = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization!.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const { coinId } = request.query
            const userId = decoded.payload.sub
            const user = await this.userService.get(String(userId))
            const coin = await this.coinService.get(String(coinId))
            await this.portfolioService.delete(user, coin)
            response.status(200).send("Success")
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }
}

export default PortfolioController