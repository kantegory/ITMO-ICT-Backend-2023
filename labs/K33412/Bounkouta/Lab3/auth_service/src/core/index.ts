import express from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import routes from '../routes/api'
import sequelize from '../providers/db'
import { Sequelize } from 'sequelize-typescript'
import bodyParser from 'body-parser'
import {serverConfig} from '../configs'


class App {
    public port: number
    public host: string
    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8000, host = 'localhost') {
        this.port = serverConfig.port || port
        this.host = serverConfig.host || host

        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use('/api', routes)
        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App