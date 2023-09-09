import express from "express";
import TodoController from "../../controllers/todoController";

/**
 * The `todoRoutes` module defines the HTTP routes for todo-related operations.
 */
const todoRoutes: express.Router = express.Router();

// Create an instance of the `TodoController`.
const controller: TodoController = new TodoController();

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
export default todoRoutes;
