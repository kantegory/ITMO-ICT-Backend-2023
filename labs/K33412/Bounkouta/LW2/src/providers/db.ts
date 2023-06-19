import {Sequelize} from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import User from '../models/users/User'
import Wallet from '../models/wallet/Wallet'
import Coin from '../models/wallet/Coin'
import CoinWallet from '../models/wallet/CoinWallet'
import {dbConfig} from '../configs'


const sequelize = new Sequelize({
    ...dbConfig,
    logging: console.log
})

const models = [User, RefreshToken, Wallet, Coin, CoinWallet]

sequelize.addModels(models)
console.log('Models added')

sequelize
    .sync()
    .then(() => {
        console.log('Models syncronized')
    })
    .catch((e) => console.log(e))

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection established successfully.')
    } catch (error) {
        console.error('Connection to the database failed:', error)
    }
}

testConnection()

export default sequelize
