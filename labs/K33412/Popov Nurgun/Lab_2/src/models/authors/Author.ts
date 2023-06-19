import { Table, Model, Column, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import passwordHash from '../../utils/passwordHash'

@Table
class Author extends Model {
    @Unique
    @AllowNull(false)
    @Column
    companyName: string

    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: Author) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = passwordHash(password)
        }
    }
}

export default Author