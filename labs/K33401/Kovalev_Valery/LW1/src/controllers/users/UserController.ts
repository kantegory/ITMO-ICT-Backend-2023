import UserService from "../../services/users/UserService";

class UserController{
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        console.log(request.params.id)
        try {
            const user = await this.userService.getById(Number(request.params.id))
            console.log(user)
            response.send(user)
        } catch (e:any) {
            response.status(404).send({ "error": e.name })
        }
    }
}

export default UserController;