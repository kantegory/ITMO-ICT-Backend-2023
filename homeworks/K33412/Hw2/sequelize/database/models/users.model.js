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
exports.Users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
let Users = class Users extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATEONLY
    }),
    __metadata("design:type", Date)
], Users.prototype, "birthday", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
Users = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Users',
        freezeTableName: false,
    })
], Users);
exports.Users = Users;
//# sourceMappingURL=users.model.js.map