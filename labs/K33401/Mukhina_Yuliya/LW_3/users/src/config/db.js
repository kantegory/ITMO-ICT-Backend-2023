const dotenv = require("dotenv");
dotenv.config()

module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    production: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    }
}