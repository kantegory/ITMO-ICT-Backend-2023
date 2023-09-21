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
const userService_1 = __importDefault(require("../services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = require("../middlewares/passport");
const tokenService_1 = __importDefault(require("../services/tokenService"));
/**
 * The `UserController` class handles user-related HTTP requests and interactions.
 */
class UserController {
    /**
     * Constructs an instance of the `UserController` class.
     */
    constructor() {
        /**
         * Retrieves a user by ID and sends it as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getById(Number(request.params.id));
                response.send(user);
            }
            catch (error) {
                response.status(404).send({ "error": error.message });
            }
        });
        /**
         * Creates a new user based on the request body and sends it as a response.
         * @param request - The HTTP request object.
         * @param response - The HTTP response object.
         */
        this.post = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.userService.create(body);
                response.status(201).send(user);
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        /**
         * Sends the authenticated user's information as a response.
         * @param request - The authenticated HTTP request object.
         * @param response - The HTTP response object.
         */
        this.me = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(request.user);
        });
        /**
         * Handles user authentication based on the provided credentials and sends JWT tokens as a response.
         * @param request - The HTTP request object with user credentials.
         * @param response - The HTTP response object.
         */
        this.auth = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const { username, password } = body;
            try {
                const { user, checkPassword } = yield this.userService.checkPassword(username, password);
                if (checkPassword) {
                    const payload = { id: user.id };
                    const accessToken = jsonwebtoken_1.default.sign(payload, passport_1.jwtOptions.secretOrKey);
                    const refreshTokenService = new tokenService_1.default(user);
                    const refreshToken = yield refreshTokenService.generateRefreshToken();
                    response.send({ accessToken, refreshToken });
                }
                else {
                    throw new Error('Login or password is incorrect!');
                }
            }
            catch (e) {
                response.status(401).send({ "error": e.message });
            }
        });
        /**
         * Handles refreshing an access token using a valid refresh token and sends the new access token as a response.
         * @param request - The HTTP request object with a refresh token.
         * @param response - The HTTP response object.
         */
        this.refreshToken = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const { refreshToken } = body;
            const refreshTokenService = new tokenService_1.default();
            try {
                const { userId, isExpired } = yield refreshTokenService.isRefreshTokenExpired(refreshToken);
                if (!isExpired && userId) {
                    const user = yield this.userService.getById(userId);
                    const payload = { id: user.id };
                    const accessToken = jsonwebtoken_1.default.sign(payload, passport_1.jwtOptions.secretOrKey);
                    const refreshTokenService = new tokenService_1.default(user);
                    const newRefreshToken = yield refreshTokenService.generateRefreshToken();
                    response.send({ accessToken, refreshToken: newRefreshToken });
                }
                else {
                    throw new Error('Invalid credentials');
                }
            }
            catch (e) {
                response.status(401).send({ 'error': 'Invalid credentials' });
            }
        });
        this.userService = new userService_1.default();
    }
}
exports.default = UserController;
