import express from "express";
import TodoController from "../../controllers/todoController";

const todoRoutes: express.Router = express.Router();
const controller: TodoController = new TodoController();

todoRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);

todoRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.update);

export default todoRoutes;
