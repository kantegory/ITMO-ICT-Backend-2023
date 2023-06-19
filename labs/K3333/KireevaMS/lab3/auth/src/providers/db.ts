import { Sequelize } from 'sequelize-typescript'
import User from '../models/users/User'
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
  database:  process.env.NAME,
  dialect: 'sqlite' || process.env.DIALECT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  storage: process.env.STORAGE,
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

/*async function dropDatabase() {
    try {
        await sequelize.drop();
        console.log('Database dropped successfully.');
    } catch (error) {
        console.error('Error dropping the database:', error);
    }
}
*/
testConnection()
//dropDatabase()
export default sequelize
