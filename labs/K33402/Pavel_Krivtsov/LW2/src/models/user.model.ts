import {
    Column, Entity, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import * as bcrypt from 'bcryptjs'
import {Watchlist} from "./watchlist.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column()
    tokenVersion: number

    @OneToMany(() => Watchlist, watchlist => watchlist.user)
    watchlist: Watchlist[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
