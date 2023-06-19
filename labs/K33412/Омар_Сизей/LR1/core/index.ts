import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"
import { sequelize } from '../config/config'

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
      const bodyParser = require('body-parser')
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())
      app.use('/user', routes)
  
      return app
    }
  
  private createServer(): Server {
      const server = createServer(this.app)
  
      return server
  }

  public start(): void {
      sequelize.sync().then(() => {
        console.log('DB connected')
      })
      this.server.listen(this.port, () => {
          console.log(`Running server on port ${this.port}`)
      })
  }
}

export default App