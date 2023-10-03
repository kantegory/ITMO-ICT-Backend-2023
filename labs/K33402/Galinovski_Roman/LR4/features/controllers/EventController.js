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
const EventService_1 = __importDefault(require("../services/EventService"));
class EventController {
    constructor() {
        this.service = new EventService_1.default();
        this.add = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.add(request.body);
                response.send({ id: result.id });
            }
            catch (error) {
                response.status(400).send(error.message);
            }
        });
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getAll();
                response.send(data);
            }
            catch (error) {
                response.status(400).send(error.message);
            }
        });
        this.getFiltered = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getByFilter(request.query.city, request.query.type);
                response.send(data);
            }
            catch (error) {
                response.status(400).send(error.message);
            }
        });
    }
}
exports.default = EventController;
