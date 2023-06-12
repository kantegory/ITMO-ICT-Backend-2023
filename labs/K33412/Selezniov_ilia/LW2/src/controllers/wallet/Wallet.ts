import Wallet from '../../models/wallet/Wallet'
import WalletService from '../../services/wallet/Wallet'
import APIError from '../../errors/APIError'


class WalletController {
    private walletService: WalletService

    constructor() {
        this.walletService = new WalletService()
    }

    private wrapperFunc = async (
        request: any,
        response: any,
        func: (id: number,walletData: any) => Promise<Wallet | APIError>
    ) => {
        // Helper function to prevent duplicated code
        const {body, user} = request
        const {id} = request.params
        if (user && await this.walletService.checkUser(id, user.id)) {
            try {
                const wallet = await func(id, body)
                response.status(200).send(wallet)
            } catch (error: any) {
                response.status(400).send({'detail': error.message})
            }
        } else {
            response.status(403).send({'detail': 'Unauthorized'})
        }
    }

    get = async (request: any, response: any) => {
        const {user} = request
        const {id} = request.params
        if (user && await this.walletService.checkUser(id, user.id)) {
            try {
                const wallet: Wallet | APIError = await this.walletService.getById(id)
                response.status(200).send(wallet)
            } catch (error: any) {
                response.status(404).send({'detail': error.message})
            }
        } else {
            response.status(403).send({'detail': 'Unauthorized'})
        }
    }

    getAll = async (request: any, response: any) => {
        const {user} = request
        if (user) {
            response.send(await this.walletService.getByUserId(user.id))
        } else {
            response.status(403).send({'detail': 'Unauthorized'})
        }
    }

    post = async (request: any, response: any) => {
        const {body, user} = request
        if (user) {
            try {
                const wallet: Wallet | APIError = await this.walletService.create(body, user)
                response.status(201).send(wallet)
            } catch (error: any) {
                response.status(400).send({'detail': error.message})
            }
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    increaseBalance = async (request: any, response: any) => {
        return this.wrapperFunc(request, response, this.walletService.increaseBalance)
    }

    decreaseBalance = async (request: any, response: any) => {
        return this.wrapperFunc(request, response, this.walletService.decreaseBalance)
    }

    buyCoin = async (request: any, response: any) => {
        return this.wrapperFunc(request, response, this.walletService.buyCoin)
    }

    sellCoin = async (request: any, response: any) => {
        return this.wrapperFunc(request, response, this.walletService.sellCoin)
    }

    sellAllCoin = async (request: any, response: any) => {
        return this.wrapperFunc(request, response, this.walletService.sellAllCoin)
    }
}

export default WalletController
