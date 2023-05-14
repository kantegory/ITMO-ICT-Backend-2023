"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const routes_1 = __importDefault(require("../routes"));
const config_1 = __importDefault(require("../configs/config"));
class App {
    constructor(port = 8000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = this.createServer();
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/v1', routes_1.default);
        return app;
    }
    createServer() {
        const server = (0, http_1.createServer)(this.app);
        return server;
    }
    start() {
        config_1.default.sync().then(() => {
            this.server.listen(this.port, () => {
                console.log(`Connect to db`);
                console.log(`Running server on port ${this.port}`);
            });
        });
    }
}
exports.default = App;
