// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';




const sequelize:Sequelize = new Sequelize({
    database: process.env.DATABASENAME,
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'database/dev.sqlite'

});
const models = [User]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is Connected")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;