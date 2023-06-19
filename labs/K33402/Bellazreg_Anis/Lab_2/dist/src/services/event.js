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
const event_1 = __importDefault(require("../errors/events/event"));
const event_2 = __importDefault(require("../models/event"));
class EventService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield event_2.default.findByPk(id);
            if (user)
                return user.toJSON();
            throw new event_1.default('Not found!');
        });
    }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventData = yield event_2.default.create(event);
                return eventData;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new event_1.default(errors);
            }
        });
    }
    listEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield event_2.default.findAll();
            if (events)
                return events;
            throw new event_1.default('Not found!');
        });
    }
}
exports.default = EventService;
