import TodoModel from "../models/todoModel";
import TodoService from "../services/todoService";
import TodoError from "../errors/todoError";

/**
 * The `TodoController` class handles HTTP requests related to todo items.
 */
class TodoController {
    private todoService: TodoService;

    /**
     * Constructs an instance of the `TodoController` class.
     */
    constructor() {
        this.todoService = new TodoService();
    }

    /**
     * Retrieves a specific todo item by ID and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const todo: TodoModel | TodoError = await this.todoService.getById(Number(request.params.id));
            response.status(200).json({ message: "TodoModel fetched successfully", data: todo });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Retrieves all todo items and sends them as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    getAll = async (request: any, response: any) => {
        try {
            const todos: TodoModel[] | TodoError = await this.todoService.getAll();
            response.status(200).json({ message: "TodoModel fetched successfully", data: todos });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Creates a new todo item based on the request body and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const todo: TodoModel | TodoError = await this.todoService.create(body);
            response.status(201).json({ message: "TodoModel created successfully", data: todo });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Deletes a todo item by ID and sends the deleted item as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    delete = async (request: any, response: any) => {
        try {
            const todo: TodoModel | TodoError = await this.todoService.delete(Number(request.params.id));
            response.status(200).json({ message: "TodoModel deleted successfully", data: todo });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Updates a todo item by ID with the request body and sends the updated item as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    update = async (request: any, response: any) => {
        const { body } = request;
        try {
            const todo: TodoModel | TodoError = await this.todoService.update(Number(request.params.id), body);
            response.status(203).json({ message: "TodoModel updated successfully", data: todo });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }
}

export default TodoController;
