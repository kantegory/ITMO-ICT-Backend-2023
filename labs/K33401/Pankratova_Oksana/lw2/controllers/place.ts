import Place from '../models/place'
import PlaceService from '../services/place'
import PlaceError from '../errors/place'
import { request } from 'express'

class PlaceController {
    private placeService: PlaceService

    constructor() {
        this.placeService = new PlaceService()
    }

    get = async (request: any, response: any) => {
        try {
            const place: Place | PlaceError = await this.placeService.getById(
                Number(request.params.id)
            )

            response.send(place)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const place : Place|PlaceError = await this.placeService.create(body)

            response.status(201).send(place)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const places = await this.placeService.getAll()

            response.send(places)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request:any, response: any) => {
        try {
            const place = await this.placeService.delete(
                Number(request.params.id)
            )

            response.send(place)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

}

export default PlaceController