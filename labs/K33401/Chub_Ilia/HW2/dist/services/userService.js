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
const userModel_1 = __importDefault(require("../models/userModel"));
const userError_1 = __importDefault(require("../errors/userError"));
const hashPasswordUtils_1 = __importDefault(require("../utils/hashPasswordUtils"));
class UserService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findByPk(id);
            if (user)
                return user.toJSON();
            throw new userError_1.default('Not found!');
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const user = yield userModel_1.default.create(userData);
                return user.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new userError_1.default(errors);
            }
        });
    }
    checkPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ where: { username } });
            if (user)
                return { user: user.toJSON(), checkPassword: hashPasswordUtils_1.default.checkPassword(password, user.password) };
            throw new userError_1.default('Incorrect login/password!');
        });
    }
}
exports.default = UserService;
