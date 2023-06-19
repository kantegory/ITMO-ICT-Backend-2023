import { Sequelize } from 'sequelize-typescript'
import dotenv from "dotenv"

import Product from '../models/products/Product'
import Realization from '../models/products/Realization'
import Supply from '../models/products/Supply'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sequelize = new Sequelize({
    database:  process.env.NAME,
    dialect:  process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    // tslint:disable-next-line:no-console
    logging: console.log,
})

const models = [Product, Realization, Supply]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('synced models')
    })
    // tslint:disable-next-line:no-console
    .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        // tslint:disable-next-line:no-console
        console.log('Connection has been established successfully.');
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize