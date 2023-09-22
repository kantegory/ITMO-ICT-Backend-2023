import RegistrationModel from "../models/registrationModel";
import RegistrationService from "../services/registrationService";
import RegistrationError from "../errors/registrationError";

/**
 * The `RegistrationController` class handles HTTP requests related to registration items.
 */
class RegistrationController {
    private registrationService: RegistrationService;

    /**
     * Constructs an instance of the `RegistrationController` class.
     * Initializes the RegistrationService.
     */
    constructor() {
        this.registrationService = new RegistrationService();
    }

    /**
     * Handles the GET request to retrieve a specific registration item by ID.
     * Sends the retrieved registration item as a response.
     * @param request - The HTTP request object containing the ID of the registration item.
     * @param response - The HTTP response object.
     */
    get = async (request: any, response: any) => {
        try {
            const registration: RegistrationModel | RegistrationError = await this.registrationService.getById(Number(request.params.id));
            response.status(200).json({ message: "RegistrationModel fetched successfully", data: registration });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Handles the GET request to retrieve all registration items.
     * Sends the retrieved registration items as a response.
     * @param request - The HTTP request object.
     * @param response - The HTTP response object.
     */
    getAll = async (request: any, response: any) => {
        try {
            const registrations: RegistrationModel[] | RegistrationError = await this.registrationService.getAll();
            response.status(200).json({ message: "RegistrationModel fetched successfully", data: registrations });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    /**
     * Handles the POST request to create a new registration item based on the request body.
     * Sends the created registration item as a response.
     * @param request - The HTTP request object containing the body with registration item data.
     * @param response - The HTTP response object.
     */
    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const registration: RegistrationModel | RegistrationError = await this.registrationService.create(body);
            response.status(201).json({ message: "RegistrationModel created successfully", data: registration });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    /**
     * Handles the DELETE request to delete a specific registration item by ID.
     * Sends the deleted registration item as a response.
     * @param request - The HTTP request object containing the ID of the registration item.
     * @param response - The HTTP response object.
     */
    delete = async (request: any, response: any) => {
        try {
            const registration: RegistrationModel | RegistrationError = await this.registrationService.delete(Number(request.params.id));
            response.status(200).json({ message: "RegistrationModel deleted successfully", data: registration });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }
}

export default RegistrationController;
