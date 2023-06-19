"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Good_1 = __importDefault(require("../../models/goods/Good"));
const convertType_1 = __importDefault(require("../../middleware/convertType"));
class GoodService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const good = yield Good_1.default.findByPk(id);
            if (good)
                return good.toJSON();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const goods = yield Good_1.default.findAll();
            if (goods)
                return goods;
        });
    }
    create(goodData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                goodData = yield convertType_1.default.convertInt(goodData, { count: goodData.count, price: goodData.price });
                const good = yield Good_1.default.create(goodData);
                return good.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    update(id, goodData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const good = yield Good_1.default.findByPk(id);
                if (good) {
                    const updateGood = yield good.update(goodData);
                    return updateGood.toJSON();
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const good = yield Good_1.default.findByPk(id);
                if (good) {
                    const deletedGood = yield good.destroy({ where: { id: id } });
                    return deletedGood;
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
}
exports.default = GoodService;
