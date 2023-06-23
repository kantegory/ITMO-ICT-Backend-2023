import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import User from '../models/users/User'
import Currency from '../models/currency/Currency'
import Briefcase from '../models/briefcases/Briefcase'
import History from '../models/history/History'

const sequelize = new Sequelize({
  database: 'db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite',
  logging: console.log,
})

const models = [User, RefreshToken, Currency, Briefcase, History]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     console.log('success models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('success db');
    } catch (error) {
        console.error('unable to connect db:', error);
    }
}

testConnection()

export default sequelize
