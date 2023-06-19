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
const User_1 = __importDefault(require("../../models/users/User"));
class UserService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(id);
            if (user)
                return user.toJSON();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.findAll();
            if (users)
                return users;
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.create(userData);
                return user.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(id);
                if (user) {
                    console.log(userData);
                    const updateUser = yield user.update(userData);
                    return updateUser.toJSON();
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(id);
                if (user) {
                    const deletedUser = yield user.destroy({ where: { id: id } });
                    return deletedUser;
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
}
exports.default = UserService;
