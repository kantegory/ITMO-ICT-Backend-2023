"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    },
    production: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        storage: process.env.STORAGE
    }
};
