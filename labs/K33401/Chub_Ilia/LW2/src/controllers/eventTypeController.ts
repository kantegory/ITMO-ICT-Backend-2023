import EventTypeModel from "../models/eventTypeModel";
import EventTypeService from "../services/eventTypeService";
import EventTypeError from "../errors/eventTypeError";

/**
 * The `EventTypeController` class handles HTTP requests related to event types.
 */
class EventTypeController {
    private eventTypeService: EventTypeService;

    /**
     * Constructs an instance of the `EventTypeController` class.
     */
    constructor() {
        this.eventTypeService = new EventTypeService();
    }

    /**
     * Retrieves a specific event type by ID and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.getById(Number(request.params.id));
            response.status(200).json({ message: "EventTypeModel fetched successfully", data: eventType });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Retrieves all event types and sends them as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    getAll = async (request: any, response: any) => {
        try {
            const eventTypes: EventTypeModel[] | EventTypeError = await this.eventTypeService.getAll();
            response.status(200).json({ message: "EventTypeModel fetched successfully", data: eventTypes });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Creates a new event type based on the request body and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.create(body);
            response.status(201).json({ message: "EventTypeModel created successfully", data: eventType });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Deletes an event type by ID and sends the deleted event type as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    delete = async (request: any, response: any) => {
        try {
            const eventType: EventTypeModel | EventTypeError = await this.eventTypeService.delete(Number(request.params.id));
            response.status(200).json({ message: "EventTypeModel deleted successfully", data: eventType });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Updates an event type by ID with the request body and sends the updated event type as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
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
