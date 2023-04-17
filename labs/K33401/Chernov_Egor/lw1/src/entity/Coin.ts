import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Portfolio} from "./Portfolio";

@Entity("coin")
export class Coin {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Portfolio, (portfolio) => portfolio.id_coin, {
        cascade: true,
        onDelete: "SET NULL"
    })
    portfolios: Portfolio[]

    @Column({
        type: "character varying",
        length: 20
    })
    name: string

    @Column("money")
    price: number

    @Column({
        type: "character varying",
        length: 200,
        nullable: true
    })
    description: string
}