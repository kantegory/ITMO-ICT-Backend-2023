import express from "express"
import { createServer, Server } from "http"
import routes from "../routes"


class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 9000, host = "localhost") {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    private createApp(): express.Application {
        const app = express()
        app.use(routes)

        return app
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App