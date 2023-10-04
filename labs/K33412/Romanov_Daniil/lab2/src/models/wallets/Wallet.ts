import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    Default, DefaultScope,
    ForeignKey,
    HasMany,
    Model, Scopes,
    Table
} from "sequelize-typescript";
import User from "../users/User";
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

    @ForeignKey(() => User)
    @Column
    userId: number

    @Default(0)
    @Column
    balance: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => CoinWallet)
    coinWallets: CoinWallet[]

    @BelongsToMany(() => Coin, () => CoinWallet)
    coins: Coin[]
}

export default Wallet