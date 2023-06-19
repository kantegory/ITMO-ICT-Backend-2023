"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Good_1 = __importDefault(require("./goods/Good"));
const Sell_1 = __importDefault(require("./sells/Sell"));
const Staff_1 = __importDefault(require("./staffs/Staff"));
const router = express_1.default.Router();
router.use('/good', Good_1.default);
router.use('/sell', Sell_1.default);
router.use('/staff', Staff_1.default);
exports.default = router;
