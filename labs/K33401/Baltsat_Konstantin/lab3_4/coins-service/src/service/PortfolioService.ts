import * as dotenv from "dotenv"
import {Repository} from "typeorm";
import {Portfolio} from "../entity/Portfolio";
import {AppDataSource} from "../data-source";


class PortfolioService {
    private portfolioRepository: Repository<Portfolio>

    constructor() {
        this.portfolioRepository = AppDataSource.getRepository(Portfolio)
    }

    async getAll() {
        return await this.portfolioRepository.find()
    }

    async getAllByUser(userId: string) {
        return await this.portfolioRepository.findBy({
            userId: userId
        })
    }

    async get(userId: string, coin: object) {
        return await this.portfolioRepository.findOneBy({
            userId: userId,
            coin: coin
        })
    }

    async create(portfolioData: object) {
        const portfolio = await this.portfolioRepository.create(portfolioData)
        return await this.portfolioRepository.save(portfolio)
    }

    async delete(userId: string, coin: object) {
        return await this.portfolioRepository.delete({
            userId: userId,
            coin: coin
        })
    }
}

export default PortfolioService