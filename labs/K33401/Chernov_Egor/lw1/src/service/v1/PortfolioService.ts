import * as dotenv from "dotenv"
import {Repository} from "typeorm";
import {Portfolio} from "../../entity/Portfolio";
import {AppDataSource} from "../../data-source";

class PortfolioService {
    private portfolioRepository: Repository<Portfolio>

    constructor() {
        this.portfolioRepository = AppDataSource.getRepository(Portfolio)
    }

    async create(user) {
        try {
            return await this.portfolioRepository.save({user: user})
        } catch (e: any) {
            throw "Error of creating portfolio"
        }
    }
}

export default PortfolioService