import EventModel from "../models/eventModel";
import EventService from "../services/eventService";
import EventError from "../errors/eventError";

/**
 * The `EventController` class handles HTTP requests related to events.
 */
class EventController {
    private eventService: EventService;

    /**
     * Constructs an instance of the `EventController` class.
     */
    constructor() {
        this.eventService = new EventService();
    }

    /**
     * Retrieves a specific event by ID and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const event: EventModel | EventError = await this.eventService.getById(Number(request.params.id));
            response.status(200).json({ message: "EventModel fetched successfully", data: event });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Retrieves all events and sends them as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    getAll = async (request: any, response: any) => {
        try {
            const events: EventModel[] | EventError = await this.eventService.getAll(request.query);
            response.status(200).json({ message: "EventModel fetched successfully", data: events });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Creates a new event based on the request body and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const event: EventModel | EventError = await this.eventService.create(body);
            response.status(201).json({ message: "EventModel created successfully", data: event });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Deletes an event by ID and sends the deleted event as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    delete = async (request: any, response: any) => {
        try {
            const event: EventModel | EventError = await this.eventService.delete(Number(request.params.id));
            response.status(200).json({ message: "EventModel deleted successfully", data: event });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Updates an event by ID with the request body and sends the updated event as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
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
