import {Sequelize} from 'sequelize-typescript'
import Wallet from '../models/wallet/Wallet'
import Coin from '../models/wallet/Coin'
import CoinWallet from '../models/wallet/CoinWallet'
import {dbConfig} from '../configs'


const sequelize = new Sequelize({
    ...dbConfig,
    logging: console.log
})

const models = [Wallet, Coin, CoinWallet]

sequelize.addModels(models)
console.log('Added models')

sequelize
    .sync()
    .then(() => {
        console.log('Synced models')
    })
    .catch((e) => console.log(e))

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testConnection()

export default sequelize
