import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import HashPasswordUtils from '../utils/hashPasswordUtils'

@Table
class UserModel extends Model {
    @AllowNull(false)
    @Unique
    @Column
    username: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: UserModel) {
        if (instance.changed('password')) {
            instance.password = HashPasswordUtils.hashPassword(instance.password)
        }
    }
}

export default UserModel
