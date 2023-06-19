// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';
import Product from '../models/product';
import Employee from '../models/employee';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import Sales from '../models/sales';

require("dotenv").config();

const sequelize:Sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'sqlite',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: 'db/dev.sqlite'
    

});
const models = [User,Product,Employee,Order,OrderItem,Sales]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is synced")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;