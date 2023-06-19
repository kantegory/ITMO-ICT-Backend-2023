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
const Sell_1 = __importDefault(require("../../models/sells/Sell"));
const Good_1 = __importDefault(require("../../models/goods/Good"));
const convertType_1 = __importDefault(require("../../middleware/convertType"));
const processData_1 = __importDefault(require("../../middleware/processData"));
class SellService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield Sell_1.default.findAll();
            if (users)
                return users;
        });
    }
    create(sellData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const good = yield Good_1.default.findOne({ where: { name: sellData.name } });
                if (good) {
                    sellData = yield convertType_1.default.convertInt(sellData, { count: sellData.count });
                    if (good.count >= sellData.count) {
                        yield good.decrement('count', { by: sellData.count });
                        sellData = yield processData_1.default.processSell(sellData, good);
                        const sell = yield Sell_1.default.create(sellData);
                        return sell.toJSON();
                    }
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    update(id, sellData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldSell = yield Sell_1.default.findByPk(id);
                if (oldSell) {
                    const good = yield Good_1.default.findOne({ where: { name: sellData.name } });
                    if (good) {
                        sellData = yield convertType_1.default.convertInt(sellData, { count: sellData.count });
                        if (oldSell.goodId != good.id) {
                            if (good.count >= sellData.count) {
                                const oldGood = yield Good_1.default.findByPk(oldSell.goodId);
                                if (oldGood) {
                                    yield oldGood.increment('count', { by: oldSell.count });
                                    yield good.decrement('count', { by: sellData.count });
                                    sellData = yield processData_1.default.processSell(sellData, good);
                                }
                            }
                        }
                        else {
                            let differenceCount = oldSell.count - sellData.count;
                            if (differenceCount > 0)
                                yield good.increment('count', { by: differenceCount });
                            if (differenceCount < 0) {
                                differenceCount = -differenceCount;
                                if (good.count >= differenceCount)
                                    yield good.decrement('count', { by: differenceCount });
                            }
                            sellData = yield processData_1.default.processSell(sellData, good);
                        }
                    }
                    const updateSell = yield oldSell.update(sellData);
                    return updateSell.toJSON();
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    earning() {
        return __awaiter(this, void 0, void 0, function* () {
            return Sell_1.default.sum('price');
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return Sell_1.default.sum('count');
        });
    }
    earningByGood(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const good = yield Good_1.default.findOne({ where: { name: name } });
            if (good)
                return Sell_1.default.sum('price', { where: { goodId: good.id } });
        });
    }
    countByGood(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const good = yield Good_1.default.findOne({ where: { name: name } });
            if (good)
                return Sell_1.default.sum('count', { where: { goodId: good.id } });
        });
    }
}
exports.default = SellService;
