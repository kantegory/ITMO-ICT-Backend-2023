import { Sequelize } from 'sequelize-typescript'
import { Person } from '../models/Person'

export const sequelize = new Sequelize({
  database: 'example_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [Person],
  repositoryMode: true
})