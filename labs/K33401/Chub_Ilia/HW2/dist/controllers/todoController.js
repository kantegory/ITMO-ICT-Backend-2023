"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoService_1 = __importDefault(require("../services/todoService"));
/**
 * The `TodoController` class handles HTTP requests related to todo items.
 */
class TodoController {
    /**
     * Constructs an instance of the `TodoController` class.
     */
    constructor() {
        /**
         * Retrieves a specific todo item by ID and sends it as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield this.todoService.getById(Number(request.params.id));
                response.status(200).json({ message: "TodoModel fetched successfully", data: todo });
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        /**
         * Retrieves all todo items and sends them as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield this.todoService.getAll();
                response.status(200).json({ message: "TodoModel fetched successfully", data: todos });
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        /**
         * Creates a new todo item based on the request body and sends it as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const todo = yield this.todoService.create(body);
                response.status(201).json({ message: "TodoModel created successfully", data: todo });
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        /**
         * Deletes a todo item by ID and sends the deleted item as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield this.todoService.delete(Number(request.params.id));
                response.status(200).json({ message: "TodoModel deleted successfully", data: todo });
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        /**
         * Updates a todo item by ID with the request body and sends the updated item as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const todo = yield this.todoService.update(Number(request.params.id), body);
                response.status(203).json({ message: "TodoModel updated successfully", data: todo });
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        this.todoService = new todoService_1.default();
    }
}
exports.default = TodoController;
