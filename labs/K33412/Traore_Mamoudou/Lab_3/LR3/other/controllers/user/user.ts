import UserService from '../../services/user/UserService'

export default class UserController {

    private service = new UserService()

    add = async (request: any, response: any) => {
        try {
            const result = await this.service.add(request.body)
            response.send({ id: result.id })
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

    getByEmail = async (request: any, response: any) => {
        try {
            const data = await this.service.getByEmail(request.query.email)
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}
