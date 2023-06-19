"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_1 = __importDefault(require("./shop"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.use('/auth', auth_1.default);
router.use('/', shop_1.default);
exports.default = router;
