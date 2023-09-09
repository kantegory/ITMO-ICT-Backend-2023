import dotenv from "dotenv"

dotenv.config()

module.exports = {
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
  