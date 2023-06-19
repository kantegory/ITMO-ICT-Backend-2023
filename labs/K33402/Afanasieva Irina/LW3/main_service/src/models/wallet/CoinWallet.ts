import {Model, Table, Column, ForeignKey, AllowNull} from 'sequelize-typescript'
import Coin from './Coin'
import Wallet from './Wallet'


@Table
class CoinWallet extends Model {
    @AllowNull(false)
    @Column
    amount: number

    @ForeignKey(() => Coin)
    @Column
    coinId: number

    @ForeignKey(() => Wallet)
    @Column
    walletId: number
}

export default CoinWallet
