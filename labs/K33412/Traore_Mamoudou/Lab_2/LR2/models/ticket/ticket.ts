import { Table, Column, Model, Min, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from '../user/User'
import Event from '../event/Event'

@Table
export default class Ticket extends Model {
  @Min(1)
  @Column
  attendants: number

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Event)
  @Column
  eventId: number

  @BelongsTo(() => Event)
  event: Event
}

