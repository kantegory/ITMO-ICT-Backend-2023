import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm"
import {User} from "./User";
import {Coin} from "./Coin";

@Entity("portfolio")
export class Portfolio {
    @PrimaryColumn()
    @ManyToOne(() => User, (user) => user.portfolios)
    id_user: User

    @PrimaryColumn()
    @ManyToOne(() => Coin, (coin) => coin.portfolios)
    id_coin: Coin

    @Column({
        type: "character varying",
        length: 20
    })
    category: string
}