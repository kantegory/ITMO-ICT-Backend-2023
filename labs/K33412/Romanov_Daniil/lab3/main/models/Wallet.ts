import {
    AllowNull,
    BelongsToMany,
    Column,
    Default, DefaultScope,
    HasMany,
    Model, Scopes,
    Table
} from "sequelize-typescript";
import CoinWallet from "./CoinWallet";
import Coin from "./Coin";

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

    @AllowNull(false)
    @Column
    userId: number

    @Default(0)
    @Column
    balance: number

    @HasMany(() => CoinWallet)
    coinWallets: CoinWallet[]

    @BelongsToMany(() => Coin, () => CoinWallet)
    coins: Coin[]
}

export default Wallet