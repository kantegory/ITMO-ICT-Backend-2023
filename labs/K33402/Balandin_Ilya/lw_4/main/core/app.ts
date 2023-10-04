import express from 'express'
import { Server,createServer } from 'http';
import {Sequelize} from 'sequelize';
import rout from '../router/index'
const cookieParser = require('cookie-parser');
import sequelize from '../database/databaseConfig';



class App {
    public port:number;
    public host:string;

    private app: express.Application;
    private server: Server;
    private sequelize: Sequelize

    constructor (port=5002, host='127.0.0.1'){
        this.port = port;
        this.host = host;
        this.sequelize= sequelize;
        this.app = this.createApp()
        this.server = this.createServer()
        
    }

    private createApp(): express.Application{
        const app = express()
        app.use(cookieParser());
        app.use(express.json())
        app.use('/',rout)

        return app
    }

    private createServer():Server{
        const server = createServer(this.app)
        return server
    }

    public start():void{
        this.server.listen(this.port,()=>{
            console.log(`Server running on port: ${this.port}`)
        })
    }



}

export default App;