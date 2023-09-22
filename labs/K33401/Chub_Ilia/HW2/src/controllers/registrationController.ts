import RegistrationModel from "../models/registrationModel";
import RegistrationService from "../services/registrationService";
import RegistrationError from "../errors/registrationError";

class RegistrationController {
    private registrationService: RegistrationService;

    constructor() {
        this.registrationService = new RegistrationService();
    }

    get = async (request: any, response: any) => {
        try {
            const registration: RegistrationModel | RegistrationError = await this.registrationService.getById(Number(request.params.id));
            response.status(200).json({ message: "RegistrationModel fetched successfully", data: registration });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const registrations: RegistrationModel[] | RegistrationError = await this.registrationService.getAll();
            response.status(200).json({ message: "RegistrationModel fetched successfully", data: registrations });
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const registration: RegistrationModel | RegistrationError = await this.registrationService.create(body);
            response.status(201).json({ message: "RegistrationModel created successfully", data: registration });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

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
