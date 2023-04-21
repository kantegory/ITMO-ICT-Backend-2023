"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.default.Router();
const controller = new index_1.default();
router.route('/read')
    .get(controller.get);
router.route('/create')
    .post(controller.post);
router.route('/user/:id')
    .get(controller.getbyID);
router.route('/update/:id')
    .put(controller.put);
router.route('/delete/:id')
    .delete(controller.delete);
exports.default = router;
