import PlaceModel from "../models/placeModel";
import PlaceService from "../services/placeService";
import PlaceError from "../errors/placeError";

/**
 * The `PlaceController` class handles HTTP requests related to place items.
 */
class PlaceController {
    private placeService: PlaceService;

    /**
     * Constructs an instance of the `PlaceController` class.
     */
    constructor() {
        this.placeService = new PlaceService();
    }

    /**
     * Retrieves a specific place item by ID and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const place: PlaceModel | PlaceError = await this.placeService.getById(Number(request.params.id));
            response.status(200).json({ message: "PlaceModel fetched successfully", data: place });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Retrieves all place items and sends them as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    getAll = async (request: any, response: any) => {
        try {
            const places: PlaceModel[] | PlaceError = await this.placeService.getAll();
            response.status(200).json({ message: "PlaceModel fetched successfully", data: places });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Creates a new place item based on the request body and sends it as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const place: PlaceModel | PlaceError = await this.placeService.create(body);
            response.status(201).json({ message: "PlaceModel created successfully", data: place });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Deletes a place item by ID and sends the deleted item as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    delete = async (request: any, response: any) => {
        try {
            const place: PlaceModel | PlaceError = await this.placeService.delete(Number(request.params.id));
            response.status(200).json({ message: "PlaceModel deleted successfully", data: place });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Updates a place item by ID with the request body and sends the updated item as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    update = async (request: any, response: any) => {
        const { body } = request;
        try {
            const place: PlaceModel | PlaceError = await this.placeService.update(Number(request.params.id), body);
            response.status(203).json({ message: "PlaceModel updated successfully", data: place });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }
}

export default PlaceController;
