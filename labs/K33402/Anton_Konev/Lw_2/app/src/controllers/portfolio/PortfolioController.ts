import PortfolioService from "../../services/portfolio/PortfolioService";

class PortfolioController {
    private portfolioService: PortfolioService;

    constructor() {
        this.portfolioService = new PortfolioService();
    }

    findByUserId = async (request: any, response: any) => {
        try {
            const portfolio = await this.portfolioService.getByUserId(request.params.id);
            return response.status(200).send(portfolio);
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }

    buyCurrency = async (request: any, response: any) => {
        try {
            const {userId, currencyId, amount} = request.body;
            const currency = await this.portfolioService.buyCurrency(userId, currencyId, amount);
            return response.status(200).send(currency);
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }

    sellCurrency = async (request: any, response: any) => {
        try {
            const {userId, currencyId, amount} = request.body;
            const currency = await this.portfolioService.sellCurrency(userId, currencyId, amount);
            return response.status(200).send(currency);
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }
}

export default PortfolioController;