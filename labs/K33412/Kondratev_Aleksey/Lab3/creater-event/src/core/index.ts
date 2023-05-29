import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/v1/index"
dotenv.config()


class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 9091, host = "localhost") {
        this.port = 9091
        this.host = process.env.HOST || host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use('/', routes)

        return app
    }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
            const all_routes = require('express-list-endpoints')
            console.log(all_routes(this.app))
        })
    }
}

export default App