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
const uuid_1 = require("uuid");
const event_1 = __importDefault(require("../services/event"));
class EventController {
    constructor() {
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.eventService.listEvents();
                return response.json(records);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        this.post = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield this.eventService.create(Object.assign(Object.assign({}, request.body), { id }));
                return response.json({ record, msg: 'Successfully create event' });
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        this.eventService = new event_1.default();
    }
}
exports.default = EventController;
