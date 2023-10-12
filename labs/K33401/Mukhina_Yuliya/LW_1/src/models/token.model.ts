import { Table, Column, Model, Unique, AllowNull, ForeignKey } from 'sequelize-typescript'
import User from './user.model'

@Table({
    createdAt: false,
    updatedAt: false,
})
class Token extends Model {
    @Unique
    @AllowNull(false)
    @Column
    token: string

    @ForeignKey(() => User)
    @Column
    userId: number
}

export default Token