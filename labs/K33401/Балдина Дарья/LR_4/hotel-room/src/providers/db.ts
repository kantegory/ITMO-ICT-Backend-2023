// @ts-nocheck
import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import Hotel from '../models/hotel/Hotel'
import Room from '../models/room/Room'
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
  database:  process.env.NAME,
  dialect:  process.env.DIALECT || 'sqlite',
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  storage: process.env.STORAGE,
  logging: console.log,
})

const models = [Hotel, Room]

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
