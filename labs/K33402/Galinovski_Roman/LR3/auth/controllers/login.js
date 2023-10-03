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
const axios_1 = __importDefault(require("axios"));
class LoginController {
    constructor() {
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const email = request.body.email;
            const password = request.body.password;
            if (email && password) {
                let result = yield axios_1.default.get("http://localhost:8000/lwth/getUserByEmail?email=" + email);
                let user = result.data;
                if (!user) {
                    response.status(401).json({ status: 'User not found', user });
                }
                else {
                    if (user.password === password) {
                        let payload = { id: user.id };
                        const jwt = require('jsonwebtoken');
                        let token = jwt.sign(payload, "secretKey");
                        response.json({ status: 'Success', token: token });
                    }
                    else {
                        response.status(401).json({ status: 'Password is incorrect' });
                    }
                }
            }
        });
    }
}
exports.default = LoginController;
