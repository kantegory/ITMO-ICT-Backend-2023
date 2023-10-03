"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const route_1 = __importDefault(require("../routes/route"));
const config_1 = require("../config/config");
const middleware_1 = require("../middleware");
class App {
    constructor(port = 8000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = this.createServer();
    }
    createApp() {
        const app = (0, express_1.default)();
        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(middleware_1.passport.initialize());
        app.use('/lwth', route_1.default);
        return app;
    }
    createServer() {
        return (0, http_1.createServer)(this.app);
    }
    start() {
        config_1.sequelize.sync().then(() => {
            console.log('DB connected');
        });
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        });
    }
}
exports.default = App;
