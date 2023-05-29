// @ts-nocheck
import { Sequelize } from 'sequelize-typescript'
import dotenv from "dotenv"
import Creater from '../models/creaters/Creater'
import Event from '../models/events/Event'
dotenv.config()

const sequelize = new Sequelize({
    database:  process.env.NAME,
    dialect:  process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    logging: console.log,
})


sequelize.addModels([Creater, Event])

sequelize
    .sync()
    .then(() => {
        console.log('synced models')
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