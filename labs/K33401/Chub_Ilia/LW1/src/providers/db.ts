import {Sequelize} from 'sequelize-typescript'
// import Token from '../models/token'
import UserModel from '../models/userModel'
// import Todo from '../models/todo'
import dotenv from "dotenv"

dotenv.config()
// @ts-ignore
const sequelize = new Sequelize({
    database: process.env.NAME,
    dialect: process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    logging: false,
})

const models = [UserModel]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        console.log('Models synced successfully')
    })
    .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize