import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"
import db from '../config/config'
class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8000, host = "localhost") {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express() // Create a new express application
        app.use(express.json()) // Parse incoming JSON requests
        app.use('/v1', routes) // Use the routes from the ../routes/index module with a base route of /v1

        return app // Return the express application
      }

    private createServer(): Server {
        const server = createServer(this.app) // Create a new HTTP server with the express application as the handler

        return server // Return the HTTP server
    }


    public start(): void {
        db.sync().then(() => {
            this.server.listen(this.port, () => {
                console.log(`Connect to database`)
                console.log(`Running server on port ${this.port}`)
            })
        })

    }
}

export default App