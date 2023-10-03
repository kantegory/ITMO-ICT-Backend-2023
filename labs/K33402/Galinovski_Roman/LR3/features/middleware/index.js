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
exports.options = exports.passport = void 0;
const UserService_1 = __importDefault(require("../services/UserService"));
exports.passport = require('passport');
const passportJwt = require('passport-jwt');
const secretKey = "secretKey";
let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;
exports.options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};
let strategy = new JwtStrategy(exports.options, function (jwt_payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = new UserService_1.default();
        let user = yield service.getById(jwt_payload.id);
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    });
});
exports.passport.use(strategy);
