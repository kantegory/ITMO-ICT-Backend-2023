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
const user_1 = __importDefault(require("../errors/users/user"));
const user_2 = __importDefault(require("../models/user"));
class UserService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_2.default.findByPk(id);
            if (user)
                return user.toJSON();
            throw new user_1.default('Not found!');
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_2.default.findOne({ where: { email } });
                return user;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_2.default.create(user);
                return userData;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_2.default.findAll();
            if (users)
                return users;
            throw new user_1.default('Not found!');
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_2.default.findByPk(id);
                if (user) {
                    user.update(data);
                }
                return user;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_2.default.destroy({ where: { id: id } });
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    checkPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_2.default.findOne({ where: {
                        "email": email,
                        "password": password
                    } });
                if (data) {
                    return { user: data, passwordMatch: true };
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
}
exports.default = UserService;
