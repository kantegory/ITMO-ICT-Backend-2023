// @ts-nocheck
import {Sequelize} from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import User from '../models/users/User'
import dotenv from "dotenv"
import Post from "../models/posts/Post";
import Comment from "../models/comments/Comment";

dotenv.config()

const sequelize = new Sequelize({
    database: process.env.NAME,
    dialect: process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    logging: console.log,
})

const models = [User, RefreshToken, Post, Comment]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        //something here
        console.log('synced models')
    })
    .catch((error) => {
        throw new Error(error.message)
    });

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw new Error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize