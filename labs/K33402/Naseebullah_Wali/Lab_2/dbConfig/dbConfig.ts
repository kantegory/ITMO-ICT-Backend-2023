// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import User from '../models/user';
import mealTable from '../models/personalCabin';
import feedback from '../models/feedback';
import Ingredient from '../models/ingredients';
import Meal from '../models/mealDb';
import MealIngredient from '../models/MealIngredient';

const sequelize:Sequelize = new Sequelize({
    database: 'lab1_db',
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'db/dev.sqlite'
    

});
const models = [User, mealTable,feedback,Ingredient,Meal,MealIngredient]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is synced")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;