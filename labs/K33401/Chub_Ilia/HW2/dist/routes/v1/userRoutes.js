"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const passport_1 = __importDefault(require("../../middlewares/passport"));
const userRoutes = express_1.default.Router();
const controller = new userController_1.default();
userRoutes.route('/')
    .post(controller.post);
userRoutes.route('/profile')
    .get(passport_1.default.authenticate('jwt', { session: false }), controller.me);
userRoutes.route('/profile/:id')
    .get(controller.get);
userRoutes.route('/login')
    .post(controller.auth);
userRoutes.route('/refresh')
    .post(controller.refreshToken);
exports.default = userRoutes;
