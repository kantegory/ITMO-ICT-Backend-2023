import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm"
import {Coin} from "./Coin";


@Entity("portfolio")
export class Portfolio {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @PrimaryColumn()
    userId: string

    // @PrimaryColumn()
    @ManyToOne(() => Coin, (coin) => coin.portfolios, {
        cascade: true,
        onDelete: "CASCADE"
    })
    coin: Coin

    @Column({
        type: "character varying",
        length: 20,
        nullable: true
    })
    category: string
}