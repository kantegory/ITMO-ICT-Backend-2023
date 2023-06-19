"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../controllers/user"));
const passport_1 = __importDefault(require("../../middlewares/passport"));
const router = express_1.default.Router();
const usercontroller = new user_1.default();
router.get('/:firstName', passport_1.default.authenticate('jwt', { session: false }), usercontroller.me);
router.route('/list')
    .get(usercontroller.get);
router.route('/create')
    .post(usercontroller.post);
router.route('/:id')
    .get(usercontroller.getbyID);
router.route('/update/:id')
    .put(usercontroller.put);
router.route('/delete/:id')
    .delete(usercontroller.delete);
exports.default = router;
