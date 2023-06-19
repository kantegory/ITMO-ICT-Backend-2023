// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';



const sequelize:Sequelize = new Sequelize({
    database: 'database1',
    dialect: 'sqlite',
    username: 'username1',
    password: 'password1',
    storage: 'dataBase/dev.sqlite'
    

});
sequelize.addModels([User])

sequelize.sync().then(()=>{
    console.log("Database is Loaded")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;