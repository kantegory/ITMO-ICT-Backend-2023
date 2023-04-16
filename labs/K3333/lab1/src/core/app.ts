import express, { Express } from "express";
import dotenv from "dotenv"; 
import { createServer, Server } from "http"
import routes from "../routes/index"
import sequelize from "../provides/db"
import { Sequelize } from "sequelize-typescript";
import bodyParser from "body-parser"

dotenv.config()


class App {
    public port: number
    public host: string
  
    private app: Express.Application
    private server: Server
    private sequelize: Sequelize

    constructor() {
        this.port = process.env.PORT
        this.host = process.env.HOST
    
        this.app = this.createApp()
        this.server = this.createServer()   
        this.sequelize = sequelize
    }
    
    private createApp(): Express.Application {
        const app = express()
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
        })
    }
}

export default App 

