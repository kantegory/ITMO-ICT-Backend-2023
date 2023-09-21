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
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const crypto_1 = require("crypto");
class TokenService {
    constructor(user = null) {
        this.generateRefreshToken = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (0, crypto_1.randomUUID)();
            const userId = (_a = this.user) === null || _a === void 0 ? void 0 : _a.id;
            yield tokenModel_1.default.create({ token, userId });
            return token;
        });
        this.isRefreshTokenExpired = (token) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield tokenModel_1.default.findOne({ where: { token } });
            if (refreshToken) {
                const tokenData = refreshToken.toJSON();
                const currentDate = new Date();
                const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime();
                if (timeDelta > 0 && timeDelta < parseInt(process.env.REFRESH_TOKEN_LIFETIME, 10)) {
                    return { userId: tokenData.userId, isExpired: false };
                }
                return { userId: null, isExpired: true };
            }
            return { userId: null, isExpired: true };
        });
        this.user = user;
    }
}
exports.default = TokenService;
