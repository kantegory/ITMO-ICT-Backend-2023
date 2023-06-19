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
const User_1 = __importDefault(require("../../services/users/User"));
class UserController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.type("json");
            const users = yield this.userService.get();
            res.send(users);
        });
        this.getById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getById(Number(request.params.id));
                response.send(user);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.post = (req, response) => __awaiter(this, void 0, void 0, function* () {
            response.type("json");
            const { body } = req;
            try {
                const user = yield this.userService.create(body);
                response.send(user);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.patch = (req, response) => __awaiter(this, void 0, void 0, function* () {
            response.type("json");
            const { body } = req;
            const { id } = req.params;
            try {
                const user = yield this.userService.update(Number(id), body);
                response.status(200).send(user);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.delete = (req, response) => __awaiter(this, void 0, void 0, function* () {
            response.type("json");
            const { id } = req.params;
            try {
                yield this.userService.delete(Number(id));
                response.status(204).send();
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.userService = new User_1.default();
    }
}
exports.default = UserController;
