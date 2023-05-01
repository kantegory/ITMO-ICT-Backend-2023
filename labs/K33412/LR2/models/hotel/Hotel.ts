import { Table, Column, Model, Min, Max, HasMany } from 'sequelize-typescript'
import Booking from '../booking/Booking'

@Table
export default class Hotel extends Model {
  @Column
  name: string

  @Column
  description: string

  @Min(1)
  @Max(5)
  @Column
  rating: number

  @Min(0)
  @Column
  capacity: number

  @Column
  city: string

  @HasMany(() => Booking)
  bookings: Booking[]
}

