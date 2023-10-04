// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../model/user';


const sequelize:Sequelize = new Sequelize({
    database: 'lab1_db',
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'db/dev.sqlite'
    

});
const models = [User]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is synced")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;