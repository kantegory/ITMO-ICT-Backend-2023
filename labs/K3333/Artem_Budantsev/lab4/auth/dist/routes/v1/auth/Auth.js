"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../../../controllers/auth/Auth"));
const passport_1 = __importDefault(require("../../../middleware/passport"));
const router = express_1.default.Router();
const controller = new Auth_1.default();
router.route("/me")
    .get(passport_1.default.authenticate('jwt', { session: false }), controller.me);
router.route('/auth/login')
    .post(controller.login);
router.route('/auth/register')
    .post(controller.register);
router.route('/validateToken')
    .post(controller.validateToken);
exports.default = router;
