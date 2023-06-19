import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import { hashPassword } from '../../utils/password'

@Table
class User extends Model {
    @AllowNull(false)
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Column
    firstName: string

    @Column
    lastName: string

    @Column
    dob: Date

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User
