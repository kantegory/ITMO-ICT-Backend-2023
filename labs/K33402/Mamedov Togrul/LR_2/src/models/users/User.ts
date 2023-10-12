import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'

// noinspection JSAnnotator
@Table
class User extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    lastname: string

    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Column
    user_info: string

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
