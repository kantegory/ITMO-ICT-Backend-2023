import EventTypeModel from "../models/eventTypeModel";
import EventTypeService from "../services/eventTypeService";
import EventTypeError from "../errors/eventTypeError";

class EventTypeController {
    private eventTypeService: EventTypeService;

    constructor() {
        this.eventTypeService = new EventTypeService();
    }

    get = async (request: any, response: any) => {
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.getById(Number(request.params.id));
            response.status(200).json({ message: "EventTypeModel fetched successfully", data: eventType });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const eventTypes: EventTypeModel[] | EventTypeError = await this.eventTypeService.getAll();
            response.status(200).json({ message: "EventTypeModel fetched successfully", data: eventTypes });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.create(body);
            response.status(201).json({ message: "EventTypeModel created successfully", data: eventType });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.delete(Number(request.params.id));
            response.status(200).json({ message: "EventTypeModel deleted successfully", data: eventType });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.update(Number(request.params.id), body);
            response.status(203).json({ message: "EventTypeModel updated successfully", data: eventType });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }
}

export default EventTypeController;
