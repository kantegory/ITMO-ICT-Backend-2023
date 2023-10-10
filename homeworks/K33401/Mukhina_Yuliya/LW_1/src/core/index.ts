import express from "express"
import cors from "cors"
import {createServer, Server} from "http"
import routes from "../routes/index"
import sequelize from "../providers/db"
import bodyParser from "body-parser"
import passport from "../middlewares/passport"
import dotenv from "dotenv"
import {Sequelize} from "sequelize-typescript";

dotenv.config()

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8000, host = "localhost") {
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
        app.use('/', routes)
        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on http://${this.host}:${this.port}`)
        })
    }
}

export default App