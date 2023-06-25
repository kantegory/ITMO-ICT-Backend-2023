import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/refreshtoken'
import User from '../models/user'

const sequelize = new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite',
  logging: console.log,
})

const models = [User, RefreshToken]

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