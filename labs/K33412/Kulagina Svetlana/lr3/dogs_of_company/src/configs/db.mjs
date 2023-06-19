import dotenv from "dotenv"
dotenv.config()

const dbConfig = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_PRODUCTION,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE
  }
}

export default dbConfig;