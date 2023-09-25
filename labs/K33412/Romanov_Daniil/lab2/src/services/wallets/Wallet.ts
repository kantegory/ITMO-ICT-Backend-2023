import Wallet from "../../models/wallets/Wallet";
import APIError from "../../errors/APIError";
import User from "../users/User";
import Coin from "../../models/wallets/Coin";
import CoinWallet from "../../models/wallets/CoinWallet";
import getCoinPrice from "../../utils/getCoinPrice";

class WalletService {
    async getById(id: number): Promise<Wallet> {
        const wallet = await Wallet.scope('nested').findByPk(id)

        if (wallet) {
            return wallet.toJSON()
        }

        throw new APIError('Not Found')
    }

    async getByUserId(id: number): Promise<Wallet[]> {
        const wallets = await Wallet.findAll({ where: { userId: id }})

        return wallets
    }

    async create(userId: number, walletData: any): Promise<Wallet> {
        try {
            const wallet = await Wallet.create({...walletData, userId: userId})
            return wallet.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }

    async increase(id: number, amount: number): Promise<Wallet> {
        const wallet = await Wallet.scope('nested').findByPk(id)

        if (wallet) {
            wallet.balance = wallet.balance + amount
            await wallet.save()
            await wallet.reload()

            return wallet.toJSON()
        }

        throw new APIError('Not found')
    }

    async decrease(id: number, amount: number): Promise<Wallet> {
        const wallet = await Wallet.scope('nested').findByPk(id)

        if (wallet) {
            if (wallet.balance < amount) {
                throw new APIError('Not Enough Money')
            }

            wallet.balance = wallet.balance - amount
            await wallet.save()
            await wallet.reload()

            return wallet.toJSON()
        }

        throw new APIError('Not found')
    }

    async buyCoin(id: number, data: any): Promise<Wallet> {
        const { ticker, amount } = data
        const wallet = await Wallet.scope('nested').findByPk(id)
        const coin = await Coin.findByPk(ticker)

        if (wallet && coin) {
            let coinWallet = await CoinWallet.findOne({ where: { walletId: id, coinId: ticker}})

            if (!coinWallet) {
                coinWallet = await CoinWallet.create({ 'walletId': id, 'coinId': ticker, 'amount': 0 })
            }

            const price = await getCoinPrice(ticker)

            if (wallet.balance < amount * price) {
                throw new APIError('Not Enough Money')
            }

            wallet.balance -= amount * price
            coinWallet.amount += amount

            await wallet.save()
            await coinWallet.save()
            await wallet.reload()
            await coinWallet.reload()

            return wallet.toJSON()
        }

        throw new APIError('Not found')
    }

    async sellCoin(id: number, data: any): Promise<Wallet> {
        const { ticker, amount } = data
        const wallet = await Wallet.scope('nested').findByPk(id)
        const coin = await Coin.findByPk(ticker)

        if (wallet && coin) {
            const coinWallet = await CoinWallet.findOne( { where: { coinId: ticker, walletId: id}})

            if (coinWallet) {
                if (coinWallet.amount < amount) {
                    throw new APIError('Not Enough Coins')
                }

                const price = await getCoinPrice(ticker)

                coinWallet.amount -= amount
                wallet.balance += amount * price

                await coinWallet.save()
                await wallet.save()
                await coinWallet.reload()
                await wallet.reload()

                return wallet.toJSON()
            }

            throw new APIError('Not found')
        }

        throw new APIError('Not found')
    }

    async verifyUser(id: number, userId: number): Promise<boolean> {
        const wallet = await Wallet.findByPk(id)

        if (wallet) {
            return wallet.userId == userId
        }

        return false
    }

}

export default WalletService