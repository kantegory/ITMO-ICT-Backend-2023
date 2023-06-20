import express from "express"
import cors from "cors"
import {createServer, Server} from "http"
import routes from "../routes/v1/index"
import sequelize from "../providers/db"
import {Sequelize} from 'sequelize-typescript'
import bodyParser from "body-parser"
import passport from "../middlewares/passport"
import dotenv from "dotenv"

dotenv.config()

class App {
    public port: number
    public host: string

    private readonly app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 1111, host = "localhost") {
        // tslint:disable-next-line:radix
        this.port = parseInt(process.env.PORT!) || port
        this.host = process.env.HOST || host

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
        return createServer(this.app)
    }

    public start(): void {
        this.server.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App
