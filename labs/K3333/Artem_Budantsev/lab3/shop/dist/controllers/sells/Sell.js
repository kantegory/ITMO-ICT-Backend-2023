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
const Sell_1 = __importDefault(require("../../services/sells/Sell"));
class SellController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.type("json");
            const users = yield this.sellService.get();
            res.send(users);
        });
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.type("json");
            const name = req.query.name;
            try {
                let totalCount = name ? yield this.sellService.countByGood(name) : yield this.sellService.count();
                const result = totalCount != null ? { "count of goods": totalCount } :
                    { "error": "good not found" };
                res.send(result);
            }
            catch (error) {
                res.status(404).send({ "error": error.message });
            }
        });
        this.earning = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.type("json");
            const name = req.query.name;
            try {
                let totalEarning = name ? yield this.sellService.earningByGood(name) : yield this.sellService.earning();
                const result = totalEarning != null ? { "total earning by good": totalEarning } :
                    { "error": "good not found" };
                res.send(result);
            }
            catch (error) {
                res.status(404).send({ "error": error.message });
            }
        });
        this.post = (req, response) => __awaiter(this, void 0, void 0, function* () {
            response.type("json");
            const { body } = req;
            try {
                const sell = yield this.sellService.create(body);
                response.send(sell);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.patch = (req, response) => __awaiter(this, void 0, void 0, function* () {
            response.type("json");
            const { body } = req;
            const { id } = req.params;
            try {
                const sell = yield this.sellService.update(Number(id), body);
                response.status(200).send(sell);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.sellService = new Sell_1.default();
    }
}
exports.default = SellController;
