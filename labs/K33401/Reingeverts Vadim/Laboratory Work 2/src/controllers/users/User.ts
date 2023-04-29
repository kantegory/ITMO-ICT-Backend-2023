import express from "express";

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
        res.status(200).send(JSON.stringify(usersWithoutPass, null, 2));
    };

    get = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;

        try {
            const user = await this.userService.getById(id);
            if (user) {
                const userWithoutPass = this.userService.exclude(user, ["password"]);
                res.status(200).send(JSON.stringify(userWithoutPass, null, 2));
            } else {
                res.status(404).send({ message: `${this.name} with id ${id} does not exist` });
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
            res.status(200).send(JSON.stringify(userWithoutPass, null, 2));
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
            res.status(200).send(JSON.stringify(userWithoutPass, null, 2));
        } catch (error) {
            this.handleError(error, res, `Failed to update ${this.name}`);
        }
    };

    delete = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;

        try {
            await this.userService.delete(id);
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res, `Failed to delete ${this.name}`);
        }
    };
    // me = async (req: express.Request, res: express.Response) => {};

    auth = async (req: express.Request, res: express.Response) => {};

    refreshToken = async (req: express.Request, res: express.Response) => {};

    register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { body } = req;

        try {
            const ss = await this.authService.addRefreshTokenToWhitelist(body);
            res.status(200).send(JSON.stringify(ss, null, 2));
        } catch (error) {
            this.handleError(error, res, `Failed to post ${this.name}`);
        }
    };
    findRefreshTokenById = async (req: express.Request, res: express.Response) => {};
    deleteRefreshToken = async (req: express.Request, res: express.Response) => {};
    revokeTokens = async (req: express.Request, res: express.Response) => {};
}

export default UserController;
