"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_1 = __importDefault(require("../../controllers/attendance"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const attendancecontroller = new attendance_1.default();
router.route('/list').get(passport_1.default.authenticate('jwt', { session: false }), attendancecontroller.get);
router.route('/create').post(passport_1.default.authenticate('jwt', { session: false }), attendancecontroller.post);
exports.default = router;
