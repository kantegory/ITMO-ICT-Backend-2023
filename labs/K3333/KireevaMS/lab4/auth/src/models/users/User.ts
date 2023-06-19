import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'

@Table
class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
        // @ts-ignore
    id: number;

    // @ts-ignore
    @Unique
    @Column
        // @ts-ignore
    username: string

    @Column
        // @ts-ignore
    firstName: string

    @Column
        // @ts-ignore
    lastName: string

    @Unique
    @Column
        // @ts-ignore
    email: string

    @AllowNull(false)
    @Column
        // @ts-ignore
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
