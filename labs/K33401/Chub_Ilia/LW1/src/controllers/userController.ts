import User from '../models/userModel';
import UserService from '../services/userService';
import UserError from '../errors/userError';
import jwt from 'jsonwebtoken';
import { jwtOptions } from '../middlewares/passport';
import TokenService from '../services/tokenService';

/**
 * The `UserController` class handles user-related HTTP requests and interactions.
 */
class UserController {
    private userService: UserService;

    /**
     * Constructs an instance of the `UserController` class.
     */
    constructor() {
        this.userService = new UserService();
    }

    /**
     * Retrieves a user by ID and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(
                Number(request.params.id)
            );
            response.send(user);
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Creates a new user based on the request body and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    post = async (request: any, response: any) => {
        const { body } = request;
        try {
            const user: User | UserError = await this.userService.create(body);
            response.status(201).send(user);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Sends the authenticated user's information as a response.
     * @param request - The authenticated HTTP request object.
     * @param response - The HTTP response object.
     */
    me = async (request: any, response: any) => {
        response.send(request.user);
    }

    /**
     * Handles user authentication based on the provided credentials and sends JWT tokens as a response.
     * @param request - The HTTP request object with user credentials.
     * @param response - The HTTP response object.
     */
    auth = async (request: any, response: any) => {
        const { body } = request;
        const { username, password } = body;
        try {
            const { user, checkPassword } = await this.userService.checkPassword(username, password);
            if (checkPassword) {
                const payload = { id: user.id };
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey);
                const refreshTokenService = new TokenService(user);
                const refreshToken = await refreshTokenService.generateRefreshToken();
                response.send({ accessToken, refreshToken });
            } else {
                throw new Error('Login or password is incorrect!');
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message });
        }
    }

    /**
     * Handles refreshing an access token using a valid refresh token and sends the new access token as a response.
     * @param request - The HTTP request object with a refresh token.
     * @param response - The HTTP response object.
     */
    refreshToken = async (request: any, response: any) => {
        const { body } = request;
        const { refreshToken } = body;
        const refreshTokenService = new TokenService();
        try {
            const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
            if (!isExpired && userId) {
                const user = await this.userService.getById(userId);
                const payload = { id: user.id };
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey);
                const refreshTokenService = new TokenService(user);
                const newRefreshToken = await refreshTokenService.generateRefreshToken();
                response.send({ accessToken, refreshToken: newRefreshToken });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (e) {
            response.status(401).send({ 'error': 'Invalid credentials' });
        }
    }
}

export default UserController;
