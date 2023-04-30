import { Table, Column, Model } from 'sequelize-typescript'

@Table
export default class User extends Model {
  @Column
  name: string

  @Column
  surname: string

  @Column
  email: string

  @Column
  address: string
}

