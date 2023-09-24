import express from "express"
import cors from "cors"
import {createServer, Server} from "http"
import routes from "../routes/v1/index"
import sequelize from "../providers/db"
import {Sequelize} from 'sequelize-typescript'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import PathUtils from "../utils/pathUtils"

dotenv.config()

/**
 * The `App` class represents the main application server.
 */
class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    /**
     * Constructs an instance of the `App` class.
     */
    constructor() {
        this.port = parseInt(process.env.PORT!) || 3000
        this.host = process.env.HOST || "127.0.0.1"

        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    /**
     * Starts the server and listens on the specified port.
     */
    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on http://${this.host}:${this.port}`)
        })
    }

    /**
     * Creates an Express application and configures middleware.
     * @returns The configured Express application.
     */

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use('/v1', routes)

        console.log("Registered routes:")
        app._router.stack.forEach(PathUtils.print.bind(null, []))

        return app
    }
    
    /**
     * Creates an HTTP server using the configured Express application.
     * @returns The HTTP server instance.
     */
    private createServer(): Server {
        return createServer(this.app)
    }
}

export default App
