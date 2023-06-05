import { Request, Response } from 'express'
import EnrollService from "../../services/enrolls/Enroll";

class EnrollController {
    private enrollService: EnrollService

    constructor() {
        this.enrollService = new EnrollService()
    }

    getAll = async (request: Request, response: Response) => {
        const enrolls = await this.enrollService.getAll()
        response.status(200).send(enrolls)
    }

    post = async (request: Request, response: Response) => {
        const {body} = request

        try {
            const enroll = await this.enrollService.create(body)
            response.status(201).send(enroll)

        } catch (error: any) {
            response.status(400).send({error: error.message})
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.enrollService.delete(request.params.id)
            response.send('Enroll deleted')
        } catch (error: any) {
            response.sendStatus(400)
        }
    }

     getUserEnrolls = async (request: any, response: any) => {
        try {
            const enrolls = await this.enrollService.getUserEnrolls(
                request.params.userId
            )

            response.send(enrolls)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default EnrollController
