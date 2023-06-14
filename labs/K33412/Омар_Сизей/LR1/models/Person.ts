import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class Person extends Model {
  @Column
  name: string

  @Column
  surname: string

  @Column
  gmail: number
}

