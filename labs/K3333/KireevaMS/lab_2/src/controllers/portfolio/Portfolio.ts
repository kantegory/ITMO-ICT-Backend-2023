import PortfolioService from "../../services/portfolio/Portfolio";
import {response} from "express";
import Currency from "../../models/currency/Currency";
import CurrencyError from "../../errors/currency/Currency";

class PortfolioController {
    private portfolioService: PortfolioService;

    constructor() {
        this.portfolioService = new PortfolioService()
    }

    buyCurrency = async (request: any, response: any) => {
        try {
            const { user_id, currency_id, amount } = request.body;
            const currency: Currency | CurrencyError = await this.portfolioService.buyCurrency(user_id, currency_id, amount);
            response.status(200).send(currency);
        } catch (error) {
            response.status(500).json({ error: 'Failed to add currency to portfolio.' });
        }
    };


    findByUser = async (request: any, response: any) => {
        try {
            const { user_id } = request.query;
            if (!user_id) {
                return response.status(400).send('User id is required.');
            }

            const currencies = await this.portfolioService.ByUser(user_id as string);
            response.send(currencies);
        } catch (error) {
            response.status(500).send('An error occurred while loading portfolio.');
        }
    };

    oneByUser= async (request: any, response: any) => {
        try {
            const { user_id, currency_id } = request.query;
            if (!user_id || !currency_id) {
                return response.status(400).send('Params are required.');
            }
            const currency = await this.portfolioService.oneByUser(user_id as string, currency_id as string);
            response.send(currency);
        } catch (error) {
            response.status(404).send('Currency not found.');
        }
    }


    getAll = async (request: any, response: any) => {
        try {
            const portfolio = await this.portfolioService.getAll()

            response.send(portfolio)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }


    sell = async (request: any, response: any) => {
        try {
            const { user_id, currency_id, amount } = request.body;
            if (!user_id || !currency_id || !amount) {
                return response.status(400).send('Params are required.');
            }
            const [currency] = await Promise.all([this.portfolioService.sell(user_id, currency_id, amount)]);

            //response.status(200).send(currency)
            if (currency) {
                response.status(200).send(currency);
            } else {
                response.status(404).send({ message: 'Currency successfully sold' });
            }

        } catch (error) {
            response.status(500).send('An error occurred during selling.');
        }
    };

}

export default PortfolioController
