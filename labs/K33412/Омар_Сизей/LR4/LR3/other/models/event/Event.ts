import { Table, Column, Model, IsDate, HasMany } from 'sequelize-typescript'
import Ticket from '../ticket/ticket'

@Table
export default class Event extends Model {
  @Column
  name: string

  @Column
  info: string

  @IsDate
  @Column
  date: Date

  @Column
  city: string

  @Column
  type: string

  @HasMany(() => Ticket)
  tickets: Ticket[]
}

