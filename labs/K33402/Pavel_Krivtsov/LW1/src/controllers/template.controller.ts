import { Request, Response } from 'express'
import TemplateService from '../services/template.service'

const templateService = new TemplateService()

class TemplateController {
    get = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const template = await templateService.getById(id)
            return response.send(template)
        } catch (error: any) {
            return response.status(404).send({ error: error.message })
        }
    }

    getAll = async (request: Request, response: Response) => {
        const templates = await templateService.getAll()
        return response.send(templates)
    }

    create = async (request: Request, response: Response) => {
        try {
            const { number_value, string_value } = request.body
            const results = await templateService.create(
                number_value,
                string_value
            )
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({ error: error.message })
        }
    }

    update = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const { number_value, string_value } = request.body
            const results = await templateService.update(
                id,
                number_value,
                string_value
            )
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({ error: error.message })
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        try {
            await templateService.delete(id)
            return response
                .status(200)
                .send({ msg: `Successfully deleted template with id = ${id}` })
        } catch (error: any) {
            return response.status(404).send({ error: error.message })
        }
    }
}

export default TemplateController
