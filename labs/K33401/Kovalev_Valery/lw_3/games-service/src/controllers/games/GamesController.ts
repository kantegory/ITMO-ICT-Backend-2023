import GamesService from "../../services/users/UserService";
import {Request, Response} from "express";

class GamesController{
    private userService: GamesService

    constructor() {
        this.userService = new GamesService()
    }
}

export default GamesController;
