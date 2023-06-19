"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../controllers/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = new auth_1.default();
router.post('/login', controller.login);
router.post('/register', controller.register);
exports.default = router;
