import express from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import routes from '../routes/v1/index'
import sequelize from '../providers/db'
import { Sequelize } from 'sequelize-typescript'
import bodyParser from 'body-parser'
import passport from '../middlewares/passport'
import configParser from '../utils/configParser'
import path from 'path'

const configPath = path.resolve(__dirname, '../configs/settings.ini')
const config: any = configParser(configPath, 'SERVER')

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8000, host = 'localhost') {
        this.port = config.port || port
        this.host = config.host || host

        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use('/v1', routes)

        return app
    }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App
