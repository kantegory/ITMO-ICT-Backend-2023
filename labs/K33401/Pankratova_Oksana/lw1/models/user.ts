import { Table, Model, Column, Unique, AllowNull, BeforeCreate, BeforeSave, BeforeUpdate } from "sequelize-typescript"
import hashPassword from '../utils/hashPassword'

@Table
class User extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare username: string

    @AllowNull(false)
    @Column
    declare first_name: string

    @AllowNull(false)    
    @Column
    declare last_name: string

    @Unique
    @AllowNull(false)
    @Column
    declare email: string

    @AllowNull(false)
    @Column
    declare password: string

    @AllowNull(true)
    @Column
    declare country: string

    @BeforeCreate
    // @BeforeUpdate
    static generatePasswordHash( instance: User) {
        const { password } = instance
        console.log(password)
        // if (instance.password == undefined) {
        if (instance.changed('password')) {
            console.log("create")
            instance.password = hashPassword(password)
        }
    }
  }


export default User