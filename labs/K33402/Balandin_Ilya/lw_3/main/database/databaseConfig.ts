// instance of sequelize
import {Sequelize} from 'sequelize-typescript';
import Competition from '../models/competition';
import Judge from '../models/judge';
import Participant from '../models/participant';
import Submission from '../models/submission';
import Team from '../models/teamData';



const sequelize:Sequelize = new Sequelize({
    database: process.env.DATABASENAME,
    dialect: 'sqlite',
    username: 'us1',
    password: 'pass',
    storage: 'database/dev.sqlite'

});
const models = [Competition,Judge,Participant,Submission,Team]

sequelize.addModels(models)


sequelize.sync().then(()=>{
    console.log("database is Connected")
}).catch(
    (e)=>console.log(e)
)

export default sequelize;