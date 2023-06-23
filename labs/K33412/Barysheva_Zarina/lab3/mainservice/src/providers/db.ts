import { Sequelize } from 'sequelize-typescript'
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

const models = [Currency, Briefcase, History]

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
