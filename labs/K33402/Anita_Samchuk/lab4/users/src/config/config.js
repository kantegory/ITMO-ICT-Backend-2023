import dotenv from "dotenv"

const envFound = dotenv.config()

if (envFound.error) {
    throw new Error('no .env file found')
}

export const сonfigDB = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    production: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    }
}