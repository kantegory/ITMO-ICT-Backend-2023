import { Sequelize } from 'sequelize-typescript'
import User from '../models/User'

export const sequelize = new Sequelize({
  database: 'roman_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [User],
  repositoryMode: true
})