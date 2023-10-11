import RegistrationService from "../services/registration.service";

class RegistrationController {
    private registrationService: RegistrationService

    constructor() {
        this.registrationService = new RegistrationService()
    }

    getUser = async (request: any) => {
        const user = await fetch(`${process.env.AUTH}`,
            {
                headers: {
                    authorization: request.headers['authorization']
                }
            })
        if (user['statusText'] != 'OK') {
            throw new Error(user['statusText'])
        }
        return await user.json()
    }

    me = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request)
            const registrations = await this.registrationService.getAllByUser(user.id)
            response.send({"user": user, "registrations": registrations})
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    unregister = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request)
            await this.registrationService.delete(request.params.id, user.id)
            response.send("Success")
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    register = async (request: any, response: any) => {
        try {
            const user = await this.getUser(request)
            await this.registrationService.create(request.params.id, user.id)
            response.send("Success")
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }
}

export default RegistrationController