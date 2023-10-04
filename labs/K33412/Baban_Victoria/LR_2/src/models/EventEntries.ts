import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './User'
import Event from './Event'

@Table
class EventEntries extends Model {
    @PrimaryKey
    @Column
    entry_id: number

    @ForeignKey(() => User)
    @Column
    user_id: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Event)
    @Column
    event_id: number

    @BelongsTo(() => Event)
    event: Event
}


export default EventEntries
