import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import routes from "../routes/index"
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

    constructor(port = 3000, host = "localhost") {
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
        app.use('', routes)
    
        return app
      }
    
    private createServer(): Server {
        const server = createServer(this.app)
    
        return server
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Everything is working! Port ${this.port}`)
        })
    }
}

export default App