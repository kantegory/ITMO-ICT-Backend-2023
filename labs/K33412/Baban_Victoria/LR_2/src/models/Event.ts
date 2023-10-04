import {Table, Column, Model, AllowNull, PrimaryKey, IsDate, AutoIncrement, BelongsToMany} from 'sequelize-typescript'
import EventEntries from "./EventEntries"
import User from "./User"

@Table
class Event extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    category: string

    @AllowNull(false)
    @Column
    place: string

    @IsDate
    @AllowNull(false)
    @Column
    date: Date

    @AllowNull(false)
    @Column
    price: string

    @AllowNull(false)
    @Column
    district: string

    @Column
    description: string

    @Column
    contact_number: string

    @Column
    contact_name: string

    @BelongsToMany(() => User, () => EventEntries)
    users: User[];
}

export default Event
