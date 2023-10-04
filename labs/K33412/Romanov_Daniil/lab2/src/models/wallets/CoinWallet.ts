import {AllowNull, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import Coin from "./Coin";
import Wallet from "./Wallet";

@Table
class CoinWallet extends Model {
    @ForeignKey(() => Coin)
    @Column
    coinId: number

    @ForeignKey(() => Wallet)
    @Column
    walletId: number

    @AllowNull(false)
    @Column
    amount: number
}

export default CoinWallet

