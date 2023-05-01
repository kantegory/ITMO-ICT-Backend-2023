import UserService from '../../services/user/index'

export default class UserController {

    private service = new UserService()

    post = async (request: any, response: any) => {
        try {
            const user = request.body
            await this.service.add(user.name, user.surname, user.email, user.password, user.address)
            response.send('Successfully added')
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    get = async (request: any, response: any) => {
        try {
            const data = await this.service.getAll()
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}
