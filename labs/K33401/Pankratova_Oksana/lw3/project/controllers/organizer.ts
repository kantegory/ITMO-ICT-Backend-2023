import Organizer from '../models/organizer'
import OrganizerService from '../services/organizer'
import OrganizerError from '../errors/organizer'
import { request } from 'express'

class OrganizerController {
    private organizerService: OrganizerService

    constructor() {
        this.organizerService = new OrganizerService()
    }

    get = async (request: any, response: any) => {
        try {
            const organizer: Organizer | OrganizerError = await this.organizerService.getById(
                Number(request.params.id)
            )

            response.send(organizer)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const organizer : Organizer|OrganizerError = await this.organizerService.create(body)

            response.status(201).send(organizer)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const organizers = await this.organizerService.getAll()

            response.send(organizers)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request:any, response: any) => {
        try {
            const organizer = await this.organizerService.delete(
                Number(request.params.id)
            )

            response.send(organizer)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

}

export default OrganizerController