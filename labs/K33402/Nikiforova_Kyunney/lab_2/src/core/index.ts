import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"
import sequelize from "../providers/db"
import { Sequelize } from 'sequelize-typescript'
import passport from "../middlewares/passport"
import cors from "cors"


class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8000, host = "localhost") {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(passport.initialize())
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(routes)

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