import 'reflect-metadata'
import 'dotenv/config'
import path from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, process.env.DB_NAME + '.sqlite'),
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../models/*.js'],
    migrations: [],
    subscribers: [],
})
