"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = __importDefault(require("../../controllers/todoController"));
/**
 * The `todoRoutes` module defines the HTTP routes for todo-related operations.
 */
const todoRoutes = express_1.default.Router();
// Create an instance of the `TodoController`.
const controller = new todoController_1.default();
// Define the HTTP routes and their associated controller methods.
/**
 * Route for creating a new todo item.
 * POST /todos
 */
todoRoutes.route('/')
    .post(controller.create);
/**
 * Route for retrieving all todo items.
 * GET /todos
 */
todoRoutes.route('/')
    .get(controller.getAll);
/**
 * Route for retrieving a specific todo item by ID.
 * GET /todos/:id
 */
todoRoutes.route('/:id')
    .get(controller.get);
/**
 * Route for deleting a specific todo item by ID.
 * DELETE /todos/:id
 */
todoRoutes.route('/:id')
    .delete(controller.delete);
/**
 * Route for updating a specific todo item by ID.
 * PUT /todos/:id
 */
todoRoutes.route('/:id')
    .put(controller.update);
// Export the configured todoRoutes for use in other parts of the application.
exports.default = todoRoutes;
