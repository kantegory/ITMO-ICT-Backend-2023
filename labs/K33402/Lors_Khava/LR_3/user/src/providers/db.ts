// @ts-nocheck
import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import User from '../models/users/User'
import Worker from '../models/workers/Worker'
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
    database: 'db',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: console.log,
})


sequelize.addModels([User, RefreshToken, Worker])

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