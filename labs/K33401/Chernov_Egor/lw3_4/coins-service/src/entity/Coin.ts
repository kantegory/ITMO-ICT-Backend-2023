import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Portfolio} from "./Portfolio";


@Entity("coin")
export class Coin {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Portfolio, (portfolio) => portfolio.coin)
    portfolios: Portfolio[]

    @Column({
        type: "character varying",
        length: 20
    })
    name: string

    @Column({
        type: "double precision"
    })
    price: number

    @Column({
        type: "character varying",
        length: 200,
        nullable: true
    })
    description: string
}