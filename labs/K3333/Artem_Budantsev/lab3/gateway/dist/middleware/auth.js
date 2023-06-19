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
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const axios_1 = __importDefault(require("axios"));
const customJwtStrategy = new passport_http_bearer_1.Strategy(function (token, done) {
    return __awaiter(this, void 0, void 0, function* () {
        axios_1.default.post(`http://localhost:8001/validateToken`, { 'accessToken': token }).then((resp) => {
            if (resp.status == 200 && resp.data.valid) {
                const user = resp.data.user;
                done(null, user);
            }
            else {
                done(null, false);
            }
        }).catch((error) => {
            done(error);
        });
    });
});
passport_1.default.use(customJwtStrategy);
exports.default = passport_1.default;
