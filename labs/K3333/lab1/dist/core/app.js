"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const index_1 = __importDefault(require("../routes/index"));
const db_1 = __importDefault(require("../provides/db"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
class App {
    constructor() {
        this.port = process.env.PORT;
        this.host = process.env.HOST;
        this.app = this.createApp();
        this.server = this.createServer();
        this.sequelize = db_1.default;
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use('/', index_1.default);
        return app;
    }
    createServer() {
        const server = (0, http_1.createServer)(this.app);
        return server;
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        });
    }
}
exports.default = App;
