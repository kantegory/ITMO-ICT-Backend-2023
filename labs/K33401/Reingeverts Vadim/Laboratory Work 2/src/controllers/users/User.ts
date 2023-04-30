import express from "express";
import { generateTokens, hashToken } from "~/utils";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import UserService from "~/services/users/User";
import BaseController from "~/controllers/BaseController";
import AuthService from "~/services/auth/Auth";
import MailService from "~/services/mail/Mail";

class UserController extends BaseController {
    private userService = new UserService();
    private authService = new AuthService();
    private mailService = new MailService();

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
            const savedRefreshToken = await this.authService.getRefreshTokenById(jwtId!);

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

    me = async (req: express.Request, res: express.Response) => {
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
            const savedRefreshToken = await this.authService.getRefreshTokenById(jwtId!);

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

            const userWithoutPass = this.userService.exclude(user, ["password"]);
            res.status(200).json(userWithoutPass);
        } catch (error) {
            this.handleError(error, res, `Failed to fetch ${this.name}`);
        }
    };

    resetPassword = async (req: express.Request, res: express.Response) => {
        const { email } = req.body;
        try {
            const user = await this.userService.getByEmail(email);
            if (!user) {
                res.status(404).json({
                    message: `${this.name} with the email ${email} does not exist`,
                });
                return;
            }

            const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
            const resetUrl = url.href + "/" + user.id;

            await this.mailService.send(
                email,
                "Password reset",
                `Did you want to reset your password?\n
                Visit this link to confirm the password reset:\n
                ${resetUrl}
                `
            );
            res.status(200).json({ message: "Link for a password reset was sent to the email" });
        } catch (error) {
            this.handleError(error, res, `Failed to reset ${this.name} password`);
        }
    };

    confirmResetPassword = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;

        try {
            const user = await this.userService.getById(id);
            if (!user) {
                res.status(404).json({
                    message: `${this.name} with the id ${id} does not exist`,
                });
                return;
            }

            const generatedPassword = uuidv4().slice(0, 16);
            await this.mailService.send(
                user.email,
                "Password reset",
                "Your new password:\n\n" + generatedPassword
            );

            await this.authService.revokeTokens(user.id);
            await this.userService.update(user.id, { password: generatedPassword });
            res.status(200).json({ message: "New password was sent to the email" });
        } catch (error) {
            this.handleError(error, res, `Failed to reset ${this.name} password`);
        }
    };
}

export default UserController;
