import express from "express";
import {createServer, Server} from "http";
import users from "../routes/User";
import auth from "../routes/Auth";
import {AppDataSource} from "../database/data-source";

class App {
    public port: number;
    public host: string;

    private app: express.Application;
    private server: Server;

    constructor(port = 8000, host = "localhost") {
        this.port = port;
        this.host = host;

        this.app = this.createApp();
        this.server = this.createServer();
    }

    private createApp(): express.Application {
        const app = express();

        app.use(express.urlencoded({extended: true}));
        app.use(express.json());

        app.use("/users", users);
        app.use("/", auth);
        return app;
    }

    private createServer(): Server {
        return createServer(this.app);
    }

    public start(): void {
        AppDataSource.initialize().then(() =>
            this.server.listen(this.port, () => {
                console.log(`Running server on port ${this.port}`);
            })
        );
    }
}

export default App;
