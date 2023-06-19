import UserRepository from '../../services/users/User'

class UserController {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userRepository.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const user = await this.userRepository.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
}

export default UserController
