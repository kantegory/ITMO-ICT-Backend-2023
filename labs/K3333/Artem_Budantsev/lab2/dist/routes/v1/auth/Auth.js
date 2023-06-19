"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../../../controllers/auth/Auth"));
const router = express_1.default.Router();
const controller = new Auth_1.default();
router.route('/login')
    .post(controller.login);
router.route('/register')
    .post(controller.register);
exports.default = router;
