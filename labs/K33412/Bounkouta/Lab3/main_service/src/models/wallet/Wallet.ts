import {
    Model,
    Table,
    Column,
    Default,
    AllowNull,
    BelongsToMany,
    HasMany,
    DefaultScope,
    Scopes,
    DataType
} from 'sequelize-typescript'
import Coin from './Coin'
import CoinWallet from './CoinWallet'


@DefaultScope(() => ({
    attributes: ['id', 'name', 'balance', 'userId'],
}))
@Scopes(() => ({
    nested: {
        attributes: ['id', 'name', 'balance', 'userId'],
        include: [{
            model: CoinWallet,
            attributes: ['amount']
        }],
        nest: true
    }
}))
@Table
class Wallet extends Model {
    @AllowNull(false)
    @Column
    name: string

    @Default(0)
    @Column({
        type: DataType.FLOAT,
        set(this, val): void {
            console.log('Balance not allowed to be set')
        }
    })
    balance: number

    @AllowNull(false)
    @Column
    userId: number

    @HasMany(() => CoinWallet)
    coinWallets: CoinWallet[]

    @BelongsToMany(() => Coin, () => CoinWallet)
    coins: Coin[]
}

export default Wallet
