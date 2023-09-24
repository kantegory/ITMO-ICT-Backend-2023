import { Table, Column, Model, Unique, AllowNull, ForeignKey } from 'sequelize-typescript'
import UserModel from './userModel'

@Table
class TokenModel extends Model {
    @Unique
    @AllowNull(false)
    @Column
    token: string

    @ForeignKey(() => UserModel)
    @Column
    userId: number
}

export default TokenModel
