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
     * Initializes the PlaceService.
     */
    constructor() {
        this.placeService = new PlaceService();
    }

    /**
     * Handles the GET request to retrieve a specific place item by ID.
     * Sends the retrieved place item as a response.
     * @param request - The HTTP request object containing the ID of the place item.
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
     * Handles the GET request to retrieve all place items.
     * Sends the retrieved place items as a response.
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
     * Handles the POST request to create a new place item based on the request body.
     * Sends the created place item as a response.
     * @param request - The HTTP request object containing the body with place item data.
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
     * Handles the DELETE request to delete a specific place item by ID.
     * Sends the deleted place item as a response.
     * @param request - The HTTP request object containing the ID of the place item.
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
     * Handles the PUT request to update a specific place item by ID with the request body.
     * Sends the updated place item as a response.
     * @param request - The HTTP request object containing the ID of the place item and the body with updated data.
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
