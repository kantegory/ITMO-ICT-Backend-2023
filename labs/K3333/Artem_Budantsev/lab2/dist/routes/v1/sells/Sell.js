"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sell_1 = __importDefault(require("../../../controllers/sells/Sell"));
const router = express_1.default.Router();
const controller = new Sell_1.default();
router.route('/')
    .post(controller.post);
router.route('/:id')
    .patch(controller.patch);
router.route("/earning")
    .get(controller.earning);
router.route('/')
    .get(controller.get);
router.route('/count')
    .get(controller.count);
exports.default = router;
