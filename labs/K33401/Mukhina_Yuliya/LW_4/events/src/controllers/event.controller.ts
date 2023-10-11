import Event from "../models/event.model"
import EventService from "../services/event.service"
import RegistrationService from "../services/registration.service";

class EventController {
    private eventService: EventService

    constructor() {
        this.eventService = new EventService()
    }

    get = async (request: any, response: any) => {
        try {
            const event: Event | Error = await this.eventService.getById(Number(request.params.id))
            const registrationService = new RegistrationService()
            const registrations = await registrationService.getAllByEvent(Number(request.params.id))
            response.status(200).json({message: "Success", event: event, registrations: registrations})
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const event: Event[] | Error = await this.eventService.getAll(request.query)
            response.status(200).json({message: "Success", data: event})
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    create = async (request: any, response: any) => {
        const {body} = request
        try {
            const event: Event | Error = await this.eventService.create(body)
            response.status(201).json({message: "Success", data: event})
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const event: Event | Error = await this.eventService.delete(Number(request.params.id))
            response.status(200).json({message: "Success", data: event})
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    update = async (request: any, response: any) => {
        const {body} = request
        try {
            const event: Event | Error = await this.eventService.update(Number(request.params.id), body)
            response.status(203).json({message: "Success", data: event})
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }
}

export default EventController