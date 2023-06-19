import express from "express"
import { createServer, Server } from "http"
import routes from "../routes"
import db from '../configs/config'

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
        const app = express()

        app.use(express.json())
        app.use('/v1', routes)

        return app
      }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }


    public start(): void {
        db.sync().then(() => {
            this.server.listen(this.port, () => {
                console.log(`Connect to db`)
                console.log(`Running server on port ${this.port}`)
            })
        })

    }
}

export default App