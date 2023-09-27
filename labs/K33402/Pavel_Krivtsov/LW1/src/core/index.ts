import express from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import { AppDataSource } from '../database/datasource'

import userRoutes from '../routes/user.routes'
import templateRoutes from '../routes/template.routes'

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8000, host = 'localhost') {
        this.port = port
        this.host = host

        this.app = this.createApp()
        console.log('Application created successfully')

        this.server = this.createServer()
        console.log('Server created successfully')
    }

    private createApp(): express.Application {
        const app = express()

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(cors())

        app.use('/users', userRoutes)
        app.use('/templates', templateRoutes)

        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        AppDataSource.initialize().then(() =>
            this.server.listen(this.port, () => {
                console.log(
                    `Running server on  http://${this.host}:${this.port}`
                )
            })
        )
    }
}

export default App
