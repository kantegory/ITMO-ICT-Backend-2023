"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../configs/config"));
const user_1 = __importDefault(require("./user"));
const event_1 = __importDefault(require("./event"));
class Attendance extends sequelize_1.Model {
}
Attendance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    UserId: {
        type: sequelize_1.DataTypes.UUIDV4, references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    },
    EventId: {
        type: sequelize_1.DataTypes.UUIDV4,
        references: {
            model: 'Events',
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    tableName: "Attendance"
});
user_1.default.hasMany(Attendance);
event_1.default.hasMany(Attendance);
exports.default = Attendance;
