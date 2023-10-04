// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';


require("dotenv").config();

const sequelize:Sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'sqlite',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: 'db/dev.sqlite'
    

});
const models = [User]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("Auth(Micro_1) database is Ready!")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;