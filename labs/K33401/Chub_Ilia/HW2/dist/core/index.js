"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const index_1 = __importDefault(require("../routes/v1/index"));
const db_1 = __importDefault(require("../providers/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("../middlewares/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const pathUtils_1 = __importDefault(require("../utils/pathUtils"));
dotenv_1.default.config();
/**
 * The `App` class represents the main application server.
 */
class App {
    /**
     * Constructs an instance of the `App` class.
     */
    constructor() {
        this.port = parseInt(process.env.PORT) || 3000;
        this.host = process.env.HOST || "127.0.0.1";
        this.app = this.createApp();
        this.server = this.createServer();
        this.sequelize = db_1.default;
    }
    /**
     * Starts the server and listens on the specified port.
     */
    start() {
        this.server.listen(this.port, () => {
            console.log(`Running server on http://${this.host}:${this.port}`);
        });
    }
    /**
     * Creates an Express application and configures middleware.
     * @returns The configured Express application.
     */
    createApp() {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(passport_1.default.initialize());
        app.use('/v1', index_1.default);
        console.log("Registered routes:");
        app._router.stack.forEach(pathUtils_1.default.print.bind(null, []));
        return app;
    }
    /**
     * Creates an HTTP server using the configured Express application.
     * @returns The HTTP server instance.
     */
    createServer() {
        return (0, http_1.createServer)(this.app);
    }
}
exports.default = App;
