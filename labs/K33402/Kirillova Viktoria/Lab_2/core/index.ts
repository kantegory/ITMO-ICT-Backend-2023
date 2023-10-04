import express from 'express'
import { Server,createServer } from 'http';
import {Sequelize} from 'sequelize';
import router from '../router/index'

const cookieParser = require('cookie-parser');
import sequelize from '../db/dbConfig';
const cors = require('cors');



class App {
    public port:number;
    public host:string;

    private app: express.Application;
    private server: Server;
    private sequelize: Sequelize

    constructor (port=4000, host='127.0.0.1'){
        this.port = port;
        this.host = host;
        this.sequelize= sequelize;
        this.app = this.createApp()
        this.server = this.createServer()
        
    }

    private createApp(): express.Application {
        const app = express();
        app.use(cookieParser());
        app.use(express.json());
    
        // Set the CORS headers
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });
    
        // Use the router
        app.use('/', router);
    
        return app;
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