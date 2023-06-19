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
Object.defineProperty(exports, "__esModule", { value: true });
class ConvertType {
    static convertInt(data, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const key of Object.keys(params))
                    data[key] = typeof data[key] == 'string' ? Number(data[key]) : data[key];
                return data;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new Error(errors);
            }
        });
    }
}
exports.default = ConvertType;
