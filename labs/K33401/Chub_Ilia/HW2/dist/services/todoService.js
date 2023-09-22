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
const todoModel_1 = __importDefault(require("../models/todoModel"));
const todoError_1 = __importDefault(require("../errors/todoError"));
class TodoService {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todoModel_1.default.findByPk(id);
            if (todo)
                return todo.toJSON();
            throw new todoError_1.default('Not found!');
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findById(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield todoModel_1.default.findAll();
        });
    }
    update(id, todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.findById(id);
                yield todoModel_1.default.update(todoData, { where: { id } });
                return yield this.findById(id);
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new todoError_1.default(errors);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTodo = yield this.findById(id);
                yield todoModel_1.default.destroy({ where: { id } });
                return deletedTodo;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new todoError_1.default(errors);
            }
        });
    }
    create(todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield todoModel_1.default.create(todoData);
                return todo.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new todoError_1.default(errors);
            }
        });
    }
}
exports.default = TodoService;
