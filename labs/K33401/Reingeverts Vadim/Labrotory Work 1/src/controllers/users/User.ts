import express from "express";
import UserService from "~/services/users/User";

class UserController {
    private userService = new UserService();
    readonly name = "User";

    private handleError = (
        error: unknown,
        res: express.Response,
        defaultMessage = "Unkown error"
    ) => {
        let errorMessage = defaultMessage;
        if (error instanceof Error) errorMessage = error.message;

        res.status(400).send({ message: errorMessage });
    };

    getAll = async (req: express.Request, res: express.Response) => {
        console.log("UserController: Got a GET request");
        res.type("json");

        const users = await this.userService.getAll();
        res.status(200).send(JSON.stringify(users, null, 2));
    };

    get = async (req: express.Request, res: express.Response) => {
        console.log("UserController: Got a GET request");
        res.type("json");
        const { id } = req.params;

        try {
            const user = await this.userService.getById(Number(id));
            if (user) {
                res.status(200).send(JSON.stringify(user, null, 2));
            } else {
                res.status(404).send({ message: `${this.name} with id ${id} does not exist` });
            }
        } catch (error) {
            this.handleError(error, res, `Failed to get ${this.name}`);
        }
    };

    post = async (req: express.Request, res: express.Response) => {
        console.log("UserController: Got a POST request");
        res.type("json");
        const { body } = req;

        try {
            const user = await this.userService.create(body);
            res.status(200).send(JSON.stringify(user, null, 2));
        } catch (error) {
            this.handleError(error, res, `Failed to create ${this.name}`);
        }
    };

    patch = async (req: express.Request, res: express.Response) => {
        console.log("UserController: Got a PATCH request");
        res.type("json");
        const { body } = req;
        const { id } = req.params;

        try {
            const user = await this.userService.update(Number(id), body);
            res.status(200).send(JSON.stringify(user, null, 2));
        } catch (error) {
            this.handleError(error, res, `Failed to update ${this.name}`);
        }
    };

    delete = async (req: express.Request, res: express.Response) => {
        console.log("UserController: Got a DELETE request");
        res.type("json");
        const { id } = req.params;

        try {
            await this.userService.delete(Number(id));
            res.status(204).send();
        } catch (error) {
            this.handleError(error, res, `Failed to delete ${this.name}`);
        }
    };
    // me = async (req: express.Request, res: express.Response) => {};

    // auth = async (req: express.Request, res: express.Response) => {};

    // refreshToken = async (req: express.Request, res: express.Response) => {};
}

export default UserController;
