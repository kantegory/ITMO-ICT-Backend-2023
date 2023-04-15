import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Portfolio} from "./Portfolio";

@Entity("user_c")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Portfolio, (portfolio) => portfolio.id_user, {
        cascade: true,
        onDelete: "CASCADE"
    })
    portfolios: Portfolio[]

    @Column({
        type: "character varying",
        length: 20
    })
    name: string

    @Column({
        type: "character varying",
        length: 20
    })
    surname: string

    @Column({
        type: "character varying",
        length: 20
    })
    phone: string

    @Column({
        type: "character varying",
        length: 20,
        nullable: true
    })
    email: string

    @Column({
        type: "character varying",
        length: 50
    })
    password: string
}