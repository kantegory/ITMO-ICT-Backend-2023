// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';



const sequelize:Sequelize = new Sequelize({
    database: 'lab1_db',
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'db/dev.sqlite'
    

});
sequelize.addModels([User])

sequelize.sync().then(()=>{
    console.log("database is synced")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;