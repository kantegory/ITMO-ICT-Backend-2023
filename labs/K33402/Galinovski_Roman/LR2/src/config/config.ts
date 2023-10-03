import { Sequelize } from 'sequelize-typescript'
import User from '../models/User'
import Event from '../models/Event'
import Ticket from '../models/Ticket'


export const sequelize = new Sequelize({
  database: 'roman_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [User, Event, Ticket],
  repositoryMode: true
})