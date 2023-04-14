import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity("user_c")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    password: string
}