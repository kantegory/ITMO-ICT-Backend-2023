import StaffService from '../../services/staffs/Staff'
import express from "express"


class StaffController {

    private staffService: StaffService

    constructor() {
        this.staffService = new StaffService()
    }

    get = async (req: express.Request, res: express.Response) => {

        res.type("json")

        const staffs = await this.staffService.get();
        res.send(staffs)
    }

    getById = async (request: any, response: any) => {
        try {
            const staff = await this.staffService.getById(
                Number(request.params.id)
            )
            response.send(staff)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (req: express.Request, response: express.Response) => {
        response.type("json") 
        const { body } = req
        try {
            const staff = await this.staffService.create(body)
            response.send(staff)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    patch = async (req: express.Request, response: express.Response) => {
        response.type("json")
        const { body } = req;
        const { id } = req.params

        try {
            const staff = await this.staffService.update(Number(id), body)
            response.status(200).send(staff)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    delete = async (req: express.Request, response: express.Response) => {
        response.type("json");
        const { id } = req.params;

        try {
            await this.staffService.delete(Number(id))
            response.status(204).send()
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };
}

export default StaffController