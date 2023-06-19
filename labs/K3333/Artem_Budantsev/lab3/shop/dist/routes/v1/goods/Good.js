"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Good_1 = __importDefault(require("../../../controllers/goods/Good"));
const passport_1 = __importDefault(require("../../../middleware/passport"));
const router = express_1.default.Router();
const controller = new Good_1.default();
router.route('/')
    .get(passport_1.default.authenticate('bearer', { session: false }), controller.get);
router.route('/:id')
    .get(passport_1.default.authenticate('bearer', { session: false }), controller.getById);
router.route('/')
    .post(passport_1.default.authenticate('bearer', { session: false }), controller.post);
router.route('/:id')
    .patch(passport_1.default.authenticate('bearer', { session: false }), controller.patch);
router.route("/:id")
    .delete(passport_1.default.authenticate('bearer', { session: false }), controller.delete);
exports.default = router;
