import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import * as bcrypt from 'bcryptjs'
import { TemplateModel } from './template.model'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    tokenVersion: number

    @ManyToMany(() => TemplateModel, {
        cascade: true,
    })
    @JoinTable()
    templateModels: TemplateModel[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
