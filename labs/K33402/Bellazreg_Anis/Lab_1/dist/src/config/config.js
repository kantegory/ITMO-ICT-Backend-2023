"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Create a new Sequelize instance with the following configuration options:
const db = new sequelize_1.Sequelize("app", "", "", {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
});
// Export the Sequelize instance as the default export of this module
exports.default = db;
