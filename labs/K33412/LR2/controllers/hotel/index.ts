import HotelService from '../../services/hotel/index'

export default class HotelController {

    private service = new HotelService()

    post = async (request: any, response: any) => {
        try {
            await this.service.add(request.body)
            response.send('Successfully added')
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    get = async (request: any, response: any) => {
        try {
            const data = await this.service.getFiltered(request.query.city, request.query.rating)
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}
