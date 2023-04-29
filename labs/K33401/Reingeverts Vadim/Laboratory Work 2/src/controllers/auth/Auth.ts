import express from "express";

import AuthService from "~/services/auth/Auth";
import BaseController from "~/controllers/BaseController";

class AuthController extends BaseController {
    private authService = new AuthService();
    readonly name = "Auth";
}

export default AuthController;
