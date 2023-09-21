"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const eventTypeModel_1 = __importDefault(require("../models/eventTypeModel"));
const placeModel_1 = __importDefault(require("../models/placeModel"));
const registrationModel_1 = __importDefault(require("../models/registrationModel"));
dotenv_1.default.config();
/**
 * This module configures and establishes a connection to the database using Sequelize.
 */
// Initialize a Sequelize instance with database configuration options.
// @ts-ignore
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.NAME,
    dialect: process.env.DIALECT || 'sqlite',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    storage: process.env.STORAGE,
    logging: true, // Enable logging for SQL queries
});
// Define the models to be used with Sequelize.
const models = [eventModel_1.default, eventTypeModel_1.default, placeModel_1.default, registrationModel_1.default, todoModel_1.default, tokenModel_1.default, userModel_1.default];
// Add the defined models to the Sequelize instance.
sequelize.addModels(models);
// Synchronize the models with the database.
sequelize
    .sync()
    .then(() => {
    console.log('Models synced successfully');
})
    .catch((e) => console.log(e));
/**
 * Asynchronous function to test the database connection.
 */
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
// Test the database connection when this module is imported.
testConnection();
exports.default = sequelize;
