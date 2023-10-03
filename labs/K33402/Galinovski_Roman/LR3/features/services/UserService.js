"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config/config");
class UserService {
    constructor() {
        this.repo = config_1.sequelize.getRepository(User_1.default);
    }
    add(user) {
        return this.repo.create(user);
    }
    getAll() {
        return this.repo.findAll();
    }
    getByEmail(email_param) {
        return this.repo.findOne({ where: { email: email_param } });
    }
    getById(id_param) {
        return this.repo.findOne({ where: { id: id_param } });
    }
}
exports.default = UserService;
