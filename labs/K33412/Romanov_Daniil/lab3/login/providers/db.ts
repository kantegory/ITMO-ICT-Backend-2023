import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import {dbConfig} from "../configs";

const sequelize = new Sequelize({
    database: dbConfig.database,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: console.log
})

sequelize.addModels([User])

sequelize.sync()
    .then(() => {
        console.log('Synced models');
    })
    .catch((error) => {
        console.error('Error syncing models:', error);
    });

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