import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import { hashPassword } from '../../utils/password'

export const enum UserRole {
    'ADMIN' = 1,
    'MANAGER',
    'EMPLOYEE'
}

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

    @AllowNull(false)
    @Column
    role: number

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
