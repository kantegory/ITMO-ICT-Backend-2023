"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const app = (0, express_1.default)();
app.use('/auth', (0, express_http_proxy_1.default)('http://localhost:8001'));
app.use('/', (0, express_http_proxy_1.default)('http://localhost:8002'));
app.listen(8000, () => {
    console.log(`Running server on port 8000`);
});
