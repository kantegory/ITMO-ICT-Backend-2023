// @ts-nocheck
import { Sequelize } from 'sequelize-typescript'
import dotenv from "dotenv"
import Portfolio from "../models/portfolio/Portfolio";
import Currency from "../models/currency/Currency";
dotenv.config()

const sequelize = new Sequelize({
  database:  process.env.NAME,
  dialect:  process.env.DIALECT || 'sqlite',
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  storage: process.env.STORAGE,
  logging: console.log,
})


const models = [Currency, Portfolio]

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

async function dropDatabase() {
    try {
        await sequelize.drop();
        console.log('Database dropped successfully.');
    } catch (error) {
        console.error('Error dropping the database:', error);
    }
}

testConnection()
//dropDatabase()
export default sequelize
