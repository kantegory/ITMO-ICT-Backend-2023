import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import hashPassword from '../utils/hashPassword'

@Table({
    createdAt: false,
    updatedAt: false,
})
class User extends Model {
    @AllowNull(false)
    @Unique
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
            instance.password = hashPassword(password)
        }
    }
}

export default User