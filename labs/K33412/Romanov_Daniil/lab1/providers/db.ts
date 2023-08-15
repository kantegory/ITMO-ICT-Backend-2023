import { Sequelize } from "sequelize-typescript";
import RefreshToken from "../models/auth/RefreshToken";
import User from "../models/users/User";

const sequelize = new Sequelize({
    database: 'my_db',
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
})

sequelize.addModels([User, RefreshToken])

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
