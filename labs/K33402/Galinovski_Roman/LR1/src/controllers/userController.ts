import DefaultService from '../services/userService'

export default class ExampleController {

    private service = new DefaultService()

    post = async (request: any, response: any) => {
        try {
            const user = request.body
            await this.service.add(user.name, user.password, user.email)
            response.send('Added' + "'" + user.name + "'" + "user")
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    get = async (request: any, response: any) => {
        try {
            const data = await this.service.get()
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}