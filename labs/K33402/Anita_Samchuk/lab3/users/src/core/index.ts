import express from "express"
import cors from "cors"
import {createServer, Server} from "http"
import routes from "../routes/index"
import sequelize from "../providers/db"
import {Sequelize} from 'sequelize-typescript'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import passport from "../middlewares/passport";

dotenv.config()

class App {
    public port: number
    public host: string

    private readonly app: express.Application
    private server: Server

    private sequelize: Sequelize

    constructor(port = 5555, host = "localhost") {
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
        app.use(bodyParser.urlencoded())
        app.use(passport.initialize())
        app.use('/api/v2', routes)

        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
            .on('error', error => {
                console.log(error.message)
                process.exit(1)
            })
    }
}

export default App