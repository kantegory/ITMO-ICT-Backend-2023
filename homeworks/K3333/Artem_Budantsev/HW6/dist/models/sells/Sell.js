"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Good_1 = __importDefault(require("../goods/Good"));
const class_validator_1 = require("class-validator");
let Sell = class Sell extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Sell.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Good_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sell.prototype, "goodId", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(1),
    (0, class_validator_1.Min)(1, { message: 'Count must be greater than 0' }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sell.prototype, "count", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT
    }),
    __metadata("design:type", Number)
], Sell.prototype, "price", void 0);
Sell = __decorate([
    sequelize_typescript_1.Table
], Sell);
exports.default = Sell;
