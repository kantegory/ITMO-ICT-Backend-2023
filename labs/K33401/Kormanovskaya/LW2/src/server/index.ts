import express from "express";
import { createServer, Server } from "http";
import users from "../routes/User";
import auth from "../routes/Auth";
import authors from "../routes/Author";
import books from "../routes/Book";
import genres from "../routes/Genre";
import readings from "../routes/Reading";
import { AppDataSource } from "../database/data-source";

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

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/users", users);
    app.use("/auth", auth);
    app.use("/authors", authors);
    app.use("/genres", genres);
    app.use("/books", books);
    app.use("/reading", readings);

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
