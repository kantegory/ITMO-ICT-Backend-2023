import { Sequelize } from 'sequelize-typescript'
import User from '../models/users/User'
import { production as dbConfig } from '../config/db'

const sequelize = new Sequelize({
  database: dbConfig.name,
  dialect: dbConfig.dialect,
  username: dbConfig.username,
  password: dbConfig.password,
  storage: dbConfig.storage,
  host: dbConfig.host,
  port: dbConfig.port,
  logging: console.log,
})

const models = [User]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     //something here
     console.log('synced models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize