import {Request, Response} from 'express'
import EnrollService from "../../services/enrolls/Enroll";
import axios from "axios";

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
        const {body} = request // only target event; id comes from token via auth service

        try {
            const auth_resp = await axios({
                url: "localhost:8000/users/profile",
                headers: request.headers
            })
            if (auth_resp.status === 200) {
                body.userId = auth_resp.data.id
                const enroll = await this.enrollService.create(body)
                response.status(201).send(enroll)
            } else {
                response.status(auth_resp.status).send()
            }
        } catch (error: any) {
            response.status(400).send({error: error.message})
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const auth_resp = await axios({
                url: "localhost:8000/users/profile",
                headers: request.headers
            })
            if (auth_resp.status === 200) {
                await this.enrollService.delete(request.params.id)
                response.send('Enroll deleted')
            } else {
                response.status(auth_resp.status).send()
            }
        } catch (error: any) {
            response.status(400).send({error: error.message})
        }
    }


    getUserEnrolls = async (request: any, response: any) => {
        try {
            const auth_resp = await axios({
                url: "localhost:8000/users/profile",
                headers: request.headers
            })
            if (auth_resp.status === 200) {
                const enrolls = await this.enrollService.getUserEnrolls(
                    request.params.userId)

                response.send(enrolls)
            } else {
                response.status(auth_resp.status).send()
            }
        } catch (error: any) {
            response.status(400).send({error: error.message})
        }
    }
}

export default EnrollController
