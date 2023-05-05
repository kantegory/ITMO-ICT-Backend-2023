import * as dotenv from "dotenv"
import {Repository} from "typeorm";
import {Portfolio} from "../../entity/Portfolio";
import {AppDataSource} from "../../data-source";

class PortfolioService {
    private portfolioRepository: Repository<Portfolio>

    constructor() {
        this.portfolioRepository = AppDataSource.getRepository(Portfolio)
    }

    async getAll() {
        return await this.portfolioRepository.find()
    }

    async getAllByUser(user: object) {
        return await this.portfolioRepository.findBy({
            user: user
        })
    }

    async get(user: object, coin: object) {
        return await this.portfolioRepository.findOneBy({
            user: user,
            coin: coin
        })
    }

    async create(portfolioData: object) {
        const portfolio = await this.portfolioRepository.create(portfolioData)
        return await this.portfolioRepository.save(portfolio)
    }

    async delete(user: object, coin: object) {
        return await this.portfolioRepository.delete({
            user: user,
            coin: coin
        })
    }
}

export default PortfolioService