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

    getUser = async (token: string) => {
        const userData = await fetch(
            `${process.env.USERS_ADDR}/profile`,
            {
                headers: {
                    authorization: token
                }
            })
        if (userData['statusText'] != 'OK') {
            throw new RegistrationError(userData['statusText'])
        }
        return await userData.json()
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

    getMy = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request.headers['authorization'])
            const registration: RegistrationModel[] | RegistrationError = await this.registrationService.getAllByUser(user.id)
            response.status(200).json({message: "Registration fetched successfully", data: registration})
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    create = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request.headers['authorization'])
            const data = {
                "userId": user.id,
                "eventId": request.body.eventId
            }
            const registration: RegistrationModel | RegistrationError = await this.registrationService.create(data)
            response.status(201).json({message: "Registration created successfully", data: registration})
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request.headers['authorization'])
            const registration: RegistrationModel | RegistrationError = await this.registrationService.delete(Number(request.params.id), user.id)
            response.status(200).json({message: "Registration deleted successfully", data: registration})
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }
}

export default RegistrationController;
