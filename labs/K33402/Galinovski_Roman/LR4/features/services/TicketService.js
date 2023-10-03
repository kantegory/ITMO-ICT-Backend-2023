"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ticket_1 = __importDefault(require("../models/Ticket"));
const config_1 = require("../config/config");
class TicketService {
    constructor() {
        this.repo = config_1.sequelize.getRepository(Ticket_1.default);
    }
    add(ticket) {
        return this.repo.create(ticket);
    }
    getForUser(user) {
        return this.repo.findAll({ where: { userId: user } });
    }
}
exports.default = TicketService;
