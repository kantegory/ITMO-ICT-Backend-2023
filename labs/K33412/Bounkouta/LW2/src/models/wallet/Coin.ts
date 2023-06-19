import {Model, Table, Column, AllowNull, PrimaryKey, BelongsToMany, DefaultScope} from 'sequelize-typescript'
import Wallet from './Wallet'
import CoinWallet from './CoinWallet'


@DefaultScope(() => ({
    attributes: ['ticker', 'name', 'createdAt']
}))
@Table
class Coin extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    ticker: string

    @AllowNull(false)
    @Column
    name: string

    @BelongsToMany(() => Wallet, () => CoinWallet)
    wallets: Wallet[]
}

export default Coin
