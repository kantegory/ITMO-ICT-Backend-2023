import { Table, Model, PrimaryKey, Column, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import passwordHash from '../../utils/passwordHash'

@Table
class User extends Model {
    @PrimaryKey
    @Column
    id: number

    @Column
    firstName: string

    @Column
    lastName: string

    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = passwordHash(password)
        }
    }
}

export default User