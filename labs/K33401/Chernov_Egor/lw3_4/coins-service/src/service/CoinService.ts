import {Repository} from "typeorm"
import {AppDataSource} from "../data-source"
import {Coin} from "../entity/Coin"


class CoinService {
    private coinRepository: Repository<Coin>

    constructor() {
        this.coinRepository = AppDataSource.getRepository(Coin)
    }

    async getAll() {
        return this.coinRepository.find()
    }

    async get(coinId: string) {
        return this.coinRepository.findOneBy({
            id: coinId
        })
    }

    async create(coinData: object) {
        const coin = await this.coinRepository.create(coinData)
        return await this.coinRepository.save(coin)
    }

    async update(coinId: string, coinData: object) {
        return await this.coinRepository.update({id: coinId}, coinData)
    }

    async delete(coinId) {
        return await this.coinRepository.delete(coinId)
    }
}

export default CoinService