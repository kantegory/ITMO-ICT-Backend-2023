import {Request, Response} from "express";
import "dotenv/config";
import * as jwt from "jsonwebtoken";

import {User} from "../models/User";
import UserService from "../services/User";
import AuthService from "../services/Auth";

const userService = new UserService();
const authService = new AuthService();

class AuthController {
    login = async (request: Request, response: Response) => {
        const {username, password} = request.body;

        if (!(username && password)) {
            return response.status(400).send({
                error: "Empty name or password",
            });
        }

        let user: User;
        try {
            user = await userService.getByUsername(username);
        } catch (error) {
            return response.status(401).send({
                error: "Cant find user from DB",
            });
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return response.status(401).send({
                error: "Wrong password",
            });
        }

        const newTokenVersion = await authService.updateUserTokenVersion(
            user.username
        );

        const token = jwt.sign(
            {userId: user.id, username: user.username, v: newTokenVersion},
            process.env.JWT_SECRET as string,
            {expiresIn: process.env.JWT_LIFETIME as string}
        );

        response.send(token);
    };

    signup = async (request: Request, response: Response) => {
        const {username, password} = request.body;

        try {
            await userService.createNewUser(username, password);
        } catch (error) {
            return response.status(409).send("Username already in use");
        }

        response.status(201).send("User created");
    };

    me = async (request: Request, response: Response) => {
        response.send({'username': response.locals.jwtPayload.username});
    };
}

export default AuthController;
