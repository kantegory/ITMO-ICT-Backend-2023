"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("../../controllers/event"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const eventcontroller = new event_1.default();
router.route('/list').get(eventcontroller.get);
router.route('/create').post(eventcontroller.post);
exports.default = router;
