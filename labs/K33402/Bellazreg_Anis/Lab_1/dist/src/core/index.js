"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = __importDefault(require("../routes/index"));
const config_1 = __importDefault(require("../config/config"));
class App {
    constructor(port = 8000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = this.createServer();
    }
    createApp() {
        const app = (0, express_1.default)(); // Create a new express application
        app.use(express_1.default.json()); // Parse incoming JSON requests
        app.use('/v1', index_1.default); // Use the routes from the ../routes/index module with a base route of /v1
        return app; // Return the express application
    }
    createServer() {
        const server = (0, http_1.createServer)(this.app); // Create a new HTTP server with the express application as the handler
        return server; // Return the HTTP server
    }
    start() {
        config_1.default.sync().then(() => {
            this.server.listen(this.port, () => {
                console.log(`Connect to database`);
                console.log(`Running server on port ${this.port}`);
            });
        });
    }
}
exports.default = App;
