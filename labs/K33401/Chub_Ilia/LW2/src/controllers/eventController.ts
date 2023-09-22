import EventModel from "../models/eventModel";
import EventService from "../services/eventService";
import EventError from "../errors/eventError";

class EventController {
    private eventService: EventService;

    constructor() {
        this.eventService = new EventService();
    }

    get = async (request: any, response: any) => {
        try {
            const event: EventModel | EventError = await this.eventService.getById(Number(request.params.id));
            response.status(200).json({ message: "EventModel fetched successfully", data: event });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const events: EventModel[] | EventError = await this.eventService.getAll(request.query);
            response.status(200).json({ message: "EventModel fetched successfully", data: events });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const event: EventModel | EventError = await this.eventService.create(body);
            response.status(201).json({ message: "EventModel created successfully", data: event });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const event: EventModel | EventError = await this.eventService.delete(Number(request.params.id));
            response.status(200).json({ message: "EventModel deleted successfully", data: event });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        try {
            const event: EventModel | EventError = await this.eventService.update(Number(request.params.id), body);
            response.status(203).json({ message: "EventModel updated successfully", data: event });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }
}

export default EventController;
