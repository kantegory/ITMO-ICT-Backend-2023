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
const Admin_1 = __importDefault(require("../../models/admin/Admin"));
const checkPassword_1 = __importDefault(require("../../utils/checkPassword"));
class AuthService {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Admin_1.default.findByPk(id);
            if (user)
                return user;
            throw new Error('User is not found by id');
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Admin_1.default.findOne({ where: { email } });
            if (user)
                return user;
            throw new Error('User is not found by email');
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Admin_1.default.create(userData);
                return user.toJSON();
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    checkPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Admin_1.default.findOne({ where: { email } });
            if (user)
                return { admin: user.toJSON(), checkPassword: (0, checkPassword_1.default)(user, password) };
            throw new Error('Incorrect login/password');
        });
    }
}
exports.default = AuthService;
