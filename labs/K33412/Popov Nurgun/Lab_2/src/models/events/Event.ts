import { PrimaryKey, Table, Model, Column, Unique, AllowNull, ForeignKey, AutoIncrement } from 'sequelize-typescript'
import Author from '../authors/Author'

@Table
class Event extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Unique
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    date: Date

    @AllowNull(false)
    @Column
    location: string

    @AllowNull(false)
    @Column
    type: string

    @ForeignKey(() => Author)
    @AllowNull(false)
    @Column
    authorId: number
}

export default Event