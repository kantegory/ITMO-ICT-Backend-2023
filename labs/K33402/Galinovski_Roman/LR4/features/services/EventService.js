"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../models/Event"));
const config_1 = require("../config/config");
class EventService {
    constructor() {
        this.repo = config_1.sequelize.getRepository(Event_1.default);
    }
    add(event) {
        return this.repo.create(event);
    }
    getAll() {
        return this.repo.findAll();
    }
    getByFilter(city_param, type_param) {
        return this.repo.findAll({ where: { city: city_param, type: type_param } });
    }
}
exports.default = EventService;
