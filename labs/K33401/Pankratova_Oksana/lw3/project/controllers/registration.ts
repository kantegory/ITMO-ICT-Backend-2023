import Registration from '../models/registration'
import RegistrationService from '../services/registration'
import RegistrationError from '../errors/registration'
import { request } from 'express'

class RegistrationController {
    private registrationService: RegistrationService

    constructor() {
        this.registrationService = new RegistrationService()
    }

    get = async (request: any, response: any) => {
        try {
            const registration: Registration | RegistrationError = await this.registrationService.getById(
                Number(request.params.id)
            )

            response.send(registration)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        const userId = (request.user as any)?.id

        if (!userId) return response.status(401).send({ error: 'Only for logged in users.' })

        try {
            const registration : Registration|RegistrationError = await this.registrationService.create({...body, userId})

            response.status(201).send(registration)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const registrations = await this.registrationService.getAll()

            response.send(registrations)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request:any, response: any) => {
        try {
            const registration = await this.registrationService.delete(
                Number(request.params.id)
            )

            response.send(registration)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

}

export default RegistrationController