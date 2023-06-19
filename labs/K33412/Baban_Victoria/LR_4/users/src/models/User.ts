import { Table, Column, Model, Unique, AllowNull, PrimaryKey, IsEmail, BelongsToMany } from 'sequelize-typescript'

@Table
class User extends Model {
    @PrimaryKey
    @Column
    id: number

    @Column
    lastName: string

    @Column
    firstName: string

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    email: string

    @Unique
    @AllowNull(false)
    @Column
    username: string

    @AllowNull(false)
    @Column
    password: string
}

export default User
