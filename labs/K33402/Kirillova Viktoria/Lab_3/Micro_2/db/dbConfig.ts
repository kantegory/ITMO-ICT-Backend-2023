// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
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
const models = [Product,Employee,Order,OrderItem,Sales]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("Main Program(Micro_2) database is Ready!")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;