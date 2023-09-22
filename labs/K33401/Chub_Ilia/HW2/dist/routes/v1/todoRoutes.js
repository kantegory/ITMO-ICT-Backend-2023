"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = __importDefault(require("../../controllers/todoController"));
const todoRoutes = express_1.default.Router();
const controller = new todoController_1.default();
todoRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);
todoRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.update);
exports.default = todoRoutes;
