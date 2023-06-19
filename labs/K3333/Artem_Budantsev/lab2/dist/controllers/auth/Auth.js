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
const passport_1 = require("../../middleware/passport");
const Auth_1 = __importDefault(require("../../services/auth/Auth"));
class AuthController {
    constructor() {
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.authService.getByEmail(request.body.email);
                if (admin) {
                    response.status(400).send({ "error": "admin with specified email already exists" });
                }
            }
            catch (error) {
                try {
                    const admin = yield this.authService.create(request.body);
                    response.status(201).send(admin);
                }
                catch (error) {
                    response.status(400).send({ "error": error.message });
                }
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const { email, password } = body;
            try {
                const { admin, checkPassword } = yield this.authService.checkPassword(email, password);
                if (checkPassword) {
                    const payload = { id: admin.id };
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
        this.authService = new Auth_1.default();
    }
}
exports.default = AuthController;
