import { Sequelize } from 'sequelize-typescript'
import Admin from '../models/admin/Admin'
import Good from '../models/goods/Good'
import Sell from '../models/sells/Sell'
import Staff from '../models/staffs/Staff'
import dotenv from "dotenv"; 

dotenv.config()


const sequelize = new Sequelize(process.env.DATABASE!, process.env.USERNAME!, process.env.PASSWORD,
  {
    dialect: "sqlite",
    storage: "db.sqlite", 
    logging: console.log});

const models = [Admin, Good, Sell, Staff]

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