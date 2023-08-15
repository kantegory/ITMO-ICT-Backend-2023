import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    Default,
    ForeignKey,
    HasMany,
    Model,
    Table
} from "sequelize-typescript";
import User from "../users/User";
import CoinWallet from "./CoinWallet";
import Coin from "./Coin";

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