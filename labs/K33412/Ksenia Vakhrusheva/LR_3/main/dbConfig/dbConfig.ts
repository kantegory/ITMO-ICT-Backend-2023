// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import Product from '../models/Product';

import Sale from '../models/Sale';
import Worker from '../models/Workers';
import Review from '../models/reviews';


const sequelize:Sequelize = new Sequelize({
    database: 'lab2_db',
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'db/dev.sqlite'
    

});
const models = [Product,Review,Worker,Sale]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is Ready")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;