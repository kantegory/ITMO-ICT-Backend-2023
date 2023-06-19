import { Table, Model, PrimaryKey, Column, Unique, AllowNull } from "sequelize-typescript";

@Table
class User extends Model {
    @PrimaryKey
    @Column
    id: number

    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Unique
    @AllowNull(false)
    @Column
    username: string
}

export default User