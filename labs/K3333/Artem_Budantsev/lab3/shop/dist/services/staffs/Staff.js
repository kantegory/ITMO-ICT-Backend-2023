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
const Staff_1 = __importDefault(require("../../models/staffs/Staff"));
class StaffService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const staff = yield Staff_1.default.findByPk(id);
            if (staff)
                return staff.toJSON();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const staffs = yield Staff_1.default.findAll();
            if (staffs)
                return staffs;
        });
    }
    create(staffData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staff = yield Staff_1.default.create(staffData);
                return staff.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
    update(id, staffData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staff = yield Staff_1.default.findByPk(id);
                if (staff) {
                    console.log(staffData);
                    const updateStaff = yield staff.update(staffData);
                    return updateStaff.toJSON();
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
                const staff = yield Staff_1.default.findByPk(id);
                if (staff) {
                    const deletedStaff = yield staff.destroy({ where: { id: id } });
                    return deletedStaff;
                }
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
}
exports.default = StaffService;
