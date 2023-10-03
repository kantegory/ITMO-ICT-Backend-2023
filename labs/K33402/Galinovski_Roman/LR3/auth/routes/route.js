"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controllers/login"));
const router = express_1.default.Router();
const loginCntroller = new login_1.default();
router
    .route('/login')
    .post(loginCntroller.login);
exports.default = router;
