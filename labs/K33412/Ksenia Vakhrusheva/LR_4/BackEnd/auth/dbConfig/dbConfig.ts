// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';



const sequelize:Sequelize = new Sequelize({
    database: 'lab2_db',
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'db/dev.sqlite'
    

});
const models = [User]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("Auth DB is Ready")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;