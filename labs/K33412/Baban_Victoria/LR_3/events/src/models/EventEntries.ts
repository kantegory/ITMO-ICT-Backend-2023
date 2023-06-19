import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Event from './Event'

@Table
class EventEntries extends Model {
    @PrimaryKey
    @Column
    entry_id: number

    @ForeignKey(() => Event)
    @Column
    event_id: number

    @BelongsTo(() => Event)
    event: Event

    @Column
    user_id: number

}


export default EventEntries
