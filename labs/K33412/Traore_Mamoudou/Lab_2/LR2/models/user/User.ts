import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import Ticket from '../ticket/ticket'

@Table
export default class User extends Model {
  @Column
  name: string

  @Column
  email: string

  @Column
  password: string

  @HasMany(() => Ticket)
  tickets: Ticket[]
}

