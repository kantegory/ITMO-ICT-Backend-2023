import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"
import { sequelize } from '../config/config'
import UserService from '../services/user/index'

export const jwtOptions: any = {}

export default class App {
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
      const passport = require('passport')
      const passportJwt = require('passport-jwt')
      let ExtractJwt = passportJwt.ExtractJwt
      let JwtStrategy = passportJwt.Strategy
      jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
      jwtOptions.secretOrKey = 'test123'
      let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload: any, next: any) {
        console.log('payload received', jwt_payload)
        const service = new UserService()
        let user = await service.getById(jwt_payload.id)
        if (user) {
          next(null, user)
        } else {
          next(null, false)
        }
      });
      passport.use(strategy)
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())
      app.use(passport.initialize())
      app.use('/v1', routes)
      return app
    }
  
  private createServer(): Server {
      return createServer(this.app)
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
