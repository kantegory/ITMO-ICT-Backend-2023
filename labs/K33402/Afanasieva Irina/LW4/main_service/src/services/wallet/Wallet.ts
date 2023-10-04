import Wallet from '../../models/wallet/Wallet'
import Coin from '../../models/wallet/Coin'
import CoinWallet from '../../models/wallet/CoinWallet'
import APIError from '../../errors/APIError'
import getCurrentPrice from '../../utils/getCurrentPrice'

class WalletService {
    async getById(id: number): Promise<Wallet | APIError> {
        const wallet = await Wallet.scope('nested').findByPk(id)
        if (wallet) {
            return wallet.toJSON()
        }
        throw new APIError('Wallet not found')
    }

    async getByUserId(userId: number): Promise<Wallet[]> {
        return await Wallet.findAll({where: {userId: userId}})
    }

    async checkUser(id: number, userId: number): Promise<boolean> {
        const wallet = await Wallet.findByPk(id)
        if (wallet) {
            return wallet.userId == userId
        }
        return false
    }

    async create(walletData: any, userId: number): Promise<Wallet | APIError> {
        try {
            const wallet = await Wallet.create({...walletData, userId: userId})
            return wallet.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }

    async increaseBalance(id: number, data: any): Promise<Wallet | APIError> {
        const {amount} = data
        const wallet = await Wallet.scope('nested').findByPk(id)
        if (wallet) {
            if (amount <= 0) {
                throw new APIError(`Got non-positive amount: ${amount}`)
            }
            console.log(amount)
            wallet.setDataValue('balance', wallet.balance + amount)
            await wallet.save()
            await wallet.reload()
            return wallet.toJSON()
        }
        throw new APIError('Wallet not found')
    }

    async decreaseBalance(id: number, data: any): Promise<Wallet | APIError> {
        const {amount} = data
        const wallet = await Wallet.scope('nested').findByPk(id)
        if (wallet) {
            if (amount <= 0) {
                throw new APIError(`Got non-positive amount: ${amount}`)
            }
            if (amount > wallet.getDataValue('balance')) {
                throw new APIError('Not enough money')
            }
            wallet.setDataValue('balance', wallet.balance - amount)
            await wallet.save()
            await wallet.reload()
            return wallet.toJSON()
        }
        throw new APIError('Wallet not found')
    }

    async buyCoin(id: number, data: any): Promise<Wallet | APIError> {
        const {amount, ticker} = data
        if (amount <= 0) {
            throw new APIError(`Got non-positive amount: ${amount}`)
        }
        const wallet = await Wallet.scope('nested').findByPk(id)
        const coin = await Coin.findByPk(ticker)
        if (wallet && coin) {
            let price: number
            try {
                price = await getCurrentPrice(ticker)
            } catch (e: any) {
                throw new APIError(e.message)
            }
            if (price * amount > wallet.getDataValue('balance')) {
                throw new APIError('Not enough money')
            }
            let coinWallet = await CoinWallet.findOne({where: {coinId: ticker, walletId: id}})
            if (!coinWallet) {
                coinWallet = await CoinWallet.create({amount: 0, coinId: ticker, walletId: id})
            }
            wallet.setDataValue('balance', wallet.getDataValue('balance') - price * amount)
            coinWallet.amount += amount
            await coinWallet.save()
            await wallet.save()
            await wallet.reload()
            return wallet.toJSON()
        } else if (!wallet) {
            throw new APIError('Wallet not found')
        } else {
            throw new APIError(`Unknown coin: ${ticker}`)
        }
    }

    async sellCoin(id: number, data: any): Promise<Wallet | APIError> {
        const {amount, ticker} = data
        if (amount <= 0) {
            throw new APIError(`Got non-positive amount: ${amount}`)
        }
        const wallet = await Wallet.scope('nested').findByPk(id)
        const coin = await Coin.findByPk(ticker)
        if (wallet && coin) {
            const coinWallet = await CoinWallet.findOne({where: {coinId: ticker, walletId: id}})
            if (coinWallet) {
                if (amount > coinWallet.amount) {
                    throw new APIError(`You don't have ${amount} ${coin.name}`)
                }
                try {
                    const price = await getCurrentPrice(ticker)
                    wallet.setDataValue('balance', wallet.getDataValue('balance') + price * amount)
                } catch (e: any) {
                    throw new APIError(e.message)
                }
                if (amount == coinWallet.amount) {
                    await coinWallet.destroy()
                } else {
                    coinWallet.amount -= amount
                    await coinWallet.save()
                }
                await wallet.save()
                await wallet.reload()
                return wallet.toJSON()
            } else {
                throw new APIError(`You don't have any ${coin.name}`)
            }
        } else if (!wallet) {
            throw new APIError('Wallet not found')
        } else {
            throw new APIError(`Unknown coin: ${ticker}`)
        }
    }

    async sellAllCoin(id: number, data: any): Promise<Wallet | APIError> {
        const {ticker} = data
        const wallet = await Wallet.scope('nested').findByPk(id)
        const coin = await Coin.findByPk(ticker)
        if (wallet && coin) {
            const coinWallet = await CoinWallet.findOne({where: {coinId: ticker, walletId: id}})
            if (coinWallet) {
                const amount = coinWallet.amount
                try {
                    const price = await getCurrentPrice(ticker)
                    wallet.setDataValue('balance', wallet.getDataValue('balance') + price * amount)
                } catch (e: any) {
                    throw new APIError(e.message)
                }
                await coinWallet.destroy()
                await wallet.save()
                await wallet.reload()
                return wallet.toJSON()
            } else {
                throw new APIError(`You don't have any ${coin.name}`)
            }
        } else if (!wallet) {
            throw new APIError('Wallet not found')
        } else {
            throw new APIError(`Unknown coin: ${ticker}`)
        }
    }
}

export default WalletService
