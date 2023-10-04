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
const index_1 = __importDefault(require("../models/index"));
// Define a UserService class that encapsulates the business logic for the User model
class UserService {
    // Define a method to retrieve a user by ID from the database
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.default.findByPk(id);
            if (user)
                return user.toJSON();
            throw new user_1.default('Not found!');
        });
    }
    // Define a method to create a new user in the database
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield index_1.default.create(user);
                return userData;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    // Define a method to retrieve a list of all users from the database
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield index_1.default.findAll();
            if (users)
                return users;
            throw new user_1.default('Not found!');
        });
    }
    // Define a method to update an existing user in the database
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_1.default.findByPk(id);
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
    // Define a method to delete a user from the database
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.destroy({ where: { id: id } });
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
}
exports.default = UserService;
