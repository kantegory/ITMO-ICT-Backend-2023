import {
    Column, Entity, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import * as bcrypt from 'bcryptjs'

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

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
