import { Table, Column, Model, IsDate, Min, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from '../user/User'
import Hotel from '../hotel/Hotel'

@Table
export default class Booking extends Model {
  @IsDate
  @Column
  startDate: Date

  @IsDate
  @Column
  finishDate: Date

  @Min(1)
  @Column
  capacity: number

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Hotel)
  @Column
  hotelId: number

  @BelongsTo(() => Hotel)
  hotel: Hotel
}

