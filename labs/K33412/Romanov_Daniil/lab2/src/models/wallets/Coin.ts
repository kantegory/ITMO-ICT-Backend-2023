import {AllowNull, BelongsToMany, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import CoinWallet from "./CoinWallet";
import Wallet from "./Wallet";

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


