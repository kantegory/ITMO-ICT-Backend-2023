import { Sequelize } from 'sequelize-typescript'
import User from '../models/user/User'
import Hotel from '../models/hotel/Hotel'
import Booking from '../models/booking/Booking'

export const sequelize = new Sequelize({
  database: 'example_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [User, Hotel, Booking],
  repositoryMode: true
})