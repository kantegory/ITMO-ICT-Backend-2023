import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.createUser(name, email, password);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUser(Number(id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
