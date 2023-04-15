import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm"
import {User} from "./User";
import {Coin} from "./Coin";

@Entity("portfolio")
export class Portfolio {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // @PrimaryColumn()
    @ManyToOne(() => User, (user) => user.portfolios)
    id_user: User

    // @PrimaryColumn()
    @ManyToOne(() => Coin, (coin) => coin.portfolios)
    id_coin: Coin

    @Column({
        type: "character varying",
        length: 20
    })
    category: string
}