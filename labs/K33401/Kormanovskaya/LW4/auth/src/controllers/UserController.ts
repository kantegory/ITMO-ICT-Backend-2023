import {Request, Response} from "express";
import UserService from "../services/User";

const userService = new UserService();

class UserController {
    getAllUsers = async (request: Request, response: Response) => {
        const allUsers = await userService.getAll();
        return response.send(allUsers);
    };

    getMe = async (request: Request, response: Response) => {
        const username = response.locals.jwtPayload.username;
        const user = await userService.getByUsername(username);
        return response.send(user);
    };
}

export default UserController;
