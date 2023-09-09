import { Sequelize } from 'sequelize-typescript';
import TokenModel from '../models/tokenModel';
import UserModel from '../models/userModel';
import TodoModel from '../models/todoModel';
import dotenv from "dotenv";

dotenv.config();

/**
 * This module configures and establishes a connection to the database using Sequelize.
 */

// Initialize a Sequelize instance with database configuration options.
// @ts-ignore
const sequelize = new Sequelize({
    database: process.env.NAME,
    dialect: process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    logging: true, // Enable logging for SQL queries
});

// Define the models to be used with Sequelize.
const models = [UserModel, TokenModel, TodoModel];

// Add the defined models to the Sequelize instance.
sequelize.addModels(models);

// Synchronize the models with the database.
sequelize
    .sync()
    .then(() => {
        console.log('Models synced successfully');
    })
    .catch((e) => console.log(e));

/**
 * Asynchronous function to test the database connection.
 */
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Test the database connection when this module is imported.
testConnection();

export default sequelize;
