import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'

@Table
class Admin extends Model {
    @Unique
    @Column
    email!: string

    @AllowNull(false)
    @Column
    password!: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: Admin) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default Admin