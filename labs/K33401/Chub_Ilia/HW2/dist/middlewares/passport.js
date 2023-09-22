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
exports.jwtOptions = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const userService_1 = __importDefault(require("../services/userService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * This module configures Passport.js for JWT (JSON Web Token) authentication.
 */
// Options for JWT authentication strategy.
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${process.env.ACCESS_TOKEN_LIFETIME}ms`
    }
};
exports.jwtOptions = opts;
// Create a custom JWT strategy for Passport.js.
const customJwtStrategy = new passport_jwt_1.Strategy(opts, function (jwt_payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const user = yield userService.getById(jwt_payload.id);
        if (user) {
            next(null, user); // Successful authentication
        }
        else {
            next(null, false); // Authentication failed
        }
    });
});
// Use the custom JWT strategy with Passport.js.
passport_1.default.use(customJwtStrategy);
exports.default = passport_1.default;
