import { MainService } from '../services/index'

class ExampleController {

    private service = new MainService()

    post = async (request: any, response: any) => {
        try {
            const body = request.body
            await this.service.add(body.name, body.surname, body.gmail)
            response.send('Added')
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
  
export default ExampleController