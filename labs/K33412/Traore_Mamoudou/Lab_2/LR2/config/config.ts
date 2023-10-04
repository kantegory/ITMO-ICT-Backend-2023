import { Sequelize } from 'sequelize-typescript'
import User from '../models/user/User'
import Event from '../models/event/Event'
import Ticket from '../models/ticket/ticket'

export const sequelize = new Sequelize({
  database: 'example_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [User, Event, Ticket],
  repositoryMode: true
})