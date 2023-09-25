import WalletService from "../../services/wallets/Wallet";

class WalletController {
    private walletService: WalletService

    constructor() {
        this.walletService = new WalletService()
    }

    get = async (request: any, response: any) => {
        const { user } = request
        const { id } = request.params

        if (await this.walletService.verifyUser(id, user.id)) {
            try {
                response.status(200).send(await this.walletService.getById(id))
            } catch (error: any) {
                response.status(404).send({"error": error})
            }
        } else {
            response.status(403).send({"error": "Unauthorized"})
        }
    }

    getAll = async (request: any, response: any) => {
        const { user } = request

        response.status(200).send(await this.walletService.getByUserId(user.id))
    }

    create = async (request: any, response: any) => {
        const { user } = request
        const { body } = request

        try {
            response.status(201).send(await this.walletService.create(user.id, body))
        } catch (error: any) {
            response.status(400).send({"error": error})
        }
    }

    increase = async (request: any, response: any) => {
        const { id } = request.params
        const { user } = request
        const { body } = request
        const { amount } = body

        if (await this.walletService.verifyUser(id, user.id)) {
            try {
                response.status(200).send(await this.walletService.increase(id, amount))
            } catch (error: any) {
                response.status(400).send({"error": error})
            }
        } else {
            response.status(403).send({"error": "Unauthorized"})
        }
    }

    decrease = async (request: any, response: any) => {
        const { id } = request.params
        const { user } = request
        const { body } = request
        const { amount } = body

        if (await this.walletService.verifyUser(id, user.id)) {
            try {
                response.status(200).send(await this.walletService.decrease(id, amount))
            } catch (error: any) {
                response.status(400).send({"error": error})
            }
        } else {
            response.status(403).send({"error": "Unauthorized"})
        }
    }

    buyCoin = async (request: any, response: any) => {
        const { id } = request.params
        const { user } = request
        const { body } = request

        if (await this.walletService.verifyUser(id, user.id)) {
            try {
                response.status(200).send(await this.walletService.buyCoin(id, body))
            } catch (error: any) {
                response.status(400).send({"error": error})
            }
        } else {
            response.status(403).send({"error": "Unauthorized"})
        }
    }

    sellCoin = async (request: any, response: any) => {
        const { id } = request.params
        const { user } = request
        const { body } = request

        if (await this.walletService.verifyUser(id, user.id)) {
            try {
                response.status(200).send(await this.walletService.sellCoin(id, body))
            } catch (error: any) {
                response.status(400).send({"error": error})
            }
        } else {
            response.status(403).send({"error": "Unauthorized"})
        }
    }
}

export default WalletController