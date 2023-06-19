import EventService from '../../services/events/Event'
import { Request, Response } from 'express'

class EventController {
    private eventService: EventService

    constructor() {
        this.eventService = new EventService()
    }

    getAll = async (request: Request, response: Response) => {
        const events = await this.eventService.getAll()
        response.status(200).send(events)
    }

    get = async (request: Request, response: Response) => {
        try {
            const event = await this.eventService.getById(Number(request.params.id))
            response.send(event)

        } catch (error: any) {
            response.status(404).send({error: error.message})
        }
    }

    post = async (request: Request, response: Response) => {
        const {body} = request

        try {
            const event = await this.eventService.create(body)
            response.status(201).send(event)

        } catch (error: any) {
            response.status(400).send({error: error.message})
        }
    }

    d_filter =  async (request: any, response: any) => {
        try {
            const events = await this.eventService.d_filter(request.params.district)
            response.send(events)

        } catch (error: any) {
            response.status(404).send({error: error.message})
        }
    }

     t_filter =  async (request: any, response: any) => {
        try {
            const events = await this.eventService.t_filter(request.params.ev_type)
            response.send(events)

        } catch (error: any) {
            response.status(404).send({error: error.message})
        }
    }
}

export default EventController
