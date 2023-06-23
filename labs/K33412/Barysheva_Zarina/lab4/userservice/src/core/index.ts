import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import routes from "../routes/v1/index"
import sequelize from "../providers/db"
import { Sequelize } from 'sequelize-typescript'
import bodyParser from "body-parser"
import passport from "../middlewares/passport"


class App {
    public port: number
    public host: string
  
    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8101, host = "localhost") {
        this.port = port
        this.host = host

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
        const server = createServer(this.app)
    
        return server
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Lab2/users on port ${this.port}`)
        })
    }
}

export default App
