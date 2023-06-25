import Event from '../models/events'
import EventService from '../services/event'
import EventError from '../errors/event'
import { request } from 'express'

class EventController {
    private eventService: EventService

    constructor() {
        this.eventService = new EventService()
    }

    get = async (request: any, response: any) => {
        try {
            const event: Event | EventError = await this.eventService.getById(
                Number(request.params.id)
            )

            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const event : Event|EventError = await this.eventService.create(body)

            response.status(201).send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const events = await this.eventService.getAll()

            response.send(events)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByType = async (request: any, response: any) => {
        try {
            const event = await this.eventService.getByType(
                request.params.type
            )

            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByPlace = async (request: any, response: any) => {
        try {
            const event = await this.eventService.getByPlace(
                request.params.place
            )

            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByOrganizer = async (request: any, response: any) => {
        try {
            const event = await this.eventService.getByOrganizer(
                request.params.organizer
            )

            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getCalendar = async (request: any, response: any) => {
        try {
            const events = await this.eventService.getCalendar()
            
            response.send(events)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        } 
    }
}

export default EventController