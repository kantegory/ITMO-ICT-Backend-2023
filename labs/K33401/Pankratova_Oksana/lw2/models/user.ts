import { Table, Model, Column, Unique, AllowNull, BeforeCreate, HasMany, BelongsToMany, BeforeUpdate } from "sequelize-typescript"
import hashPassword from '../utils/hashPassword'

@Table
class User extends Model {
    @AllowNull(false)
    @Column
    first_name: string

    @AllowNull(false)    
    @Column
    last_name: string

    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash( instance: User) {
        const { password } = instance
        console.log(password)
        if (instance.changed('password')) {
            console.log("create")
            instance.password = hashPassword(instance.password)
        }
    }
  }


export default User