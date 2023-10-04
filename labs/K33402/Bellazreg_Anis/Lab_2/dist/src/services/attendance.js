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
const attendance_1 = __importDefault(require("../errors/attendance/attendance"));
const attendance_2 = __importDefault(require("../models/attendance"));
class AttendanceService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield attendance_2.default.findByPk(id);
            if (attendance)
                return attendance.toJSON();
            throw new attendance_1.default('Not found!');
        });
    }
    create(attendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield attendance_2.default.create(attendance);
                return data;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new attendance_1.default(errors);
            }
        });
    }
    listAttendances(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendances = yield attendance_2.default.findAll({ where: { UserId } });
            if (attendances)
                return attendances;
            throw new attendance_1.default('Not found!');
        });
    }
}
exports.default = AttendanceService;
