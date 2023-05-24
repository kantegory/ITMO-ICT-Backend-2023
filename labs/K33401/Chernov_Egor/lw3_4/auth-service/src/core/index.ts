import * as dotenv from "dotenv";
import express from "express"
import {createServer, Server} from "http"
import routes from "../route/index"
import {AppDataSource} from "../data-source";


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


class App {
    public port: number
    public host: string

    private readonly app: express.Application
    private server: Server

    constructor(port=parseInt(process.env.PORT), host=String(process.env.HOST)) {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express()
        app.use("/", routes)

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