"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const router = express_1.default.Router();
const controller = new userController_1.default();
router.route('/')
    .get(controller.get);
router.route('/:id')
    .get(controller.getById);
router.route('/')
    .post(controller.post);
router.route('/:id')
    .patch(controller.patch);
router.route("/:id")
    .delete(controller.delete);
exports.default = router;