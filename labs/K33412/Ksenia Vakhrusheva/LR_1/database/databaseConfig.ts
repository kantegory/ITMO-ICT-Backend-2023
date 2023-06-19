// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';
import Tokens from '../models/tokens';
import userproducts from '../models/userproducts'



const sequelize:Sequelize = new Sequelize({
    database: process.env.DATABASENAME,
    dialect: 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE

});
const models = [User, Tokens,userproducts]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is Connected")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;