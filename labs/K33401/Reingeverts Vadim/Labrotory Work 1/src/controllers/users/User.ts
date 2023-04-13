import UserService from "~/services/users/User";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    get = async (request: any, response: any) => {};

    post = async (request: any, response: any) => {};

    me = async (request: any, response: any) => {};

    auth = async (request: any, response: any) => {};

    refreshToken = async (request: any, response: any) => {};
}

export default UserController;
