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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = require("../middlewares/passport");
const user_1 = __importDefault(require("../services/user"));
const uuid_1 = require("uuid");
const user_2 = __importDefault(require("../models/user"));
class AuthController {
    constructor() {
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const email = request.body.email;
            try {
                // console.log(email)
                const user = yield user_2.default.findOne({ where: {
                        email
                    } });
                if (user) {
                    response.status(400).send({ "error": "User with specified email already exists" });
                }
                else {
                    const id = (0, uuid_1.v4)();
                    const users = yield user_2.default.create(Object.assign(Object.assign({}, request.body), { id }));
                    response.status(201).send(users);
                }
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const { email, password } = body;
            try {
                const { user, passwordMatch } = yield this.userService.checkPassword(email, password);
                if (passwordMatch) {
                    const payload = { id: user.id };
                    const accessToken = jsonwebtoken_1.default.sign(payload, passport_1.jwtOptions.secretOrKey);
                    response.send({ accessToken });
                }
                else {
                    throw new Error('Invalid credentials');
                }
            }
            catch (e) {
                response.status(401).send({ "error": e.message });
            }
        });
        this.userService = new user_1.default();
    }
}
exports.default = AuthController;
