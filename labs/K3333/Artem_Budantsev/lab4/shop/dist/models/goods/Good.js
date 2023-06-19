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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
let Good = class Good extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Good.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        validate: {
            isInt: true
        }
    }),
    (0, class_validator_1.Min)(0, { message: 'Count must be greater than 0' }),
    __metadata("design:type", Number)
], Good.prototype, "count", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, class_validator_1.Min)(0, { message: 'Count must be greater than 0' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT
    }),
    __metadata("design:type", Number)
], Good.prototype, "price", void 0);
Good = __decorate([
    sequelize_typescript_1.Table
], Good);
exports.default = Good;
