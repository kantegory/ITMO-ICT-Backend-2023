import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate} from "typeorm"
import {Portfolio} from "./Portfolio"
import hashPassword from "../util/v1/hashPassword"

@Entity("user_c")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
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
        length: 20,
        nullable: true
    })
    phone: string

    @Column({
        type: "character varying",
        length: 20,
        unique: true
    })
    email: string

    @Column({
        type: "character varying",
        length: 100
    })
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashPassword(this.password)
    }
}