import express from "express";
import { generateTokens, hashToken } from "~/utils";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import UserService from "~/services/users/User";
import BaseController from "~/controllers/BaseController";
import AuthService from "~/services/auth/Auth";

class UserController extends BaseController {
    private userService = new UserService();
    private authService = new AuthService();

    readonly name = "User";

    getAll = async (req: express.Request, res: express.Response) => {
        const users = await this.userService.getAll();
        const usersWithoutPass = this.userService.excludeMany(users, ["password"]);
        res.status(200).json(usersWithoutPass);
    };

    get = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;

        try {
            const user = await this.userService.getById(id);
            if (user) {
                const userWithoutPass = this.userService.exclude(user, ["password"]);
                res.status(200).json(userWithoutPass);
            } else {
                res.status(404).json({ message: `${this.name} with the id ${id} does not exist` });
            }
        } catch (error) {
            this.handleError(error, res, `Failed to get ${this.name}`);
        }
    };

    post = async (req: express.Request, res: express.Response) => {
        const { body } = req;

        try {
            const user = await this.userService.create(body);
            const userWithoutPass = this.userService.exclude(user, ["password"]);
            res.status(200).json(userWithoutPass);
        } catch (error) {
            this.handleError(error, res, `Failed to create ${this.name}`);
        }
    };

    patch = async (req: express.Request, res: express.Response) => {
        const { body } = req;
        const { id } = req.params;

        try {
            const user = await this.userService.update(id, body);
            const userWithoutPass = this.userService.exclude(user, ["password"]);
            res.status(200).json(userWithoutPass);
        } catch (error) {
            this.handleError(error, res, `Failed to update ${this.name}`);
        }
    };

    delete = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;

        try {
            await this.userService.delete(id);
            res.status(204).json();
        } catch (error) {
            this.handleError(error, res, `Failed to delete ${this.name}`);
        }
    };
    // me = async (req: express.Request, res: express.Response) => {};

    register = async (req: express.Request, res: express.Response) => {
        const { body } = req;

        try {
            const user = await this.userService.create(body);

            const jwtId = uuidv4();
            const { accessToken, refreshToken } = generateTokens(user, jwtId);
            await this.authService.addRefreshTokenToWhitelist({
                jwtId,
                refreshToken,
                userId: user.id,
            });

            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            this.handleError(error, res, `Failed to register ${this.name}`);
        }
    };

    login = async (req: express.Request, res: express.Response) => {
        const { email, password } = req.body;

        try {
            const user = await this.userService.getByEmail(email);
            if (!user) {
                res.status(404).json({
                    message: `${this.name} with the email ${email} does not exist`,
                });
                return;
            }

            const isPasswordValid = await this.userService.comparePasswordByUser(user, password);

            if (!isPasswordValid) {
                res.status(404).json({
                    message: `Invalid password for ${this.name}`,
                });
                return;
            }
            const jwtId = uuidv4();
            const { accessToken, refreshToken } = generateTokens(user, jwtId);
            await this.authService.addRefreshTokenToWhitelist({
                jwtId,
                refreshToken,
                userId: user.id,
            });

            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            this.handleError(error, res, `Failed to login ${this.name}`);
        }
    };

    refreshToken = async (req: express.Request, res: express.Response) => {
        const { refreshToken } = req.body;

        try {
            if (!refreshToken) {
                res.status(400).json({
                    message: "Missing refresh token",
                });
                return;
            }
            const { userId, jti: jwtId } = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET!
            ) as jwt.JwtPayload;
            const savedRefreshToken = await this.authService.findRefreshTokenById(jwtId!);

            if (!savedRefreshToken || savedRefreshToken.revoked === true) {
                res.status(401).json({
                    message: "Unauthorized",
                });
                return;
            }

            const hashedToken = hashToken(refreshToken);
            if (hashedToken !== savedRefreshToken.hashedToken) {
                res.status(401).json({
                    message: "Unauthorized",
                });
                return;
            }

            const user = await this.userService.getById(userId);
            if (!user) {
                res.status(401).json({
                    message: "Unauthorized",
                });
                return;
            }

            await this.authService.deleteRefreshToken(savedRefreshToken.id);
            const newJwtId = uuidv4();
            const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, newJwtId);
            await this.authService.addRefreshTokenToWhitelist({
                jwtId: newJwtId,
                refreshToken: newRefreshToken,
                userId: user.id,
            });

            res.status(200).json({
                accessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            this.handleError(error, res, `Failed to login ${this.name}`);
        }
    };
}

export default UserController;
