import WorkerService from '../../services/workers/Worker'

class WorkerController {
    private workerService: WorkerService

    constructor() {
        this.workerService = new WorkerService()
    }

    get = async (request: any, response: any) => {
        try {
            const worker = await this.workerService.getById(
                Number(request.params.id)
            )
            response.send(worker)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request
        try {
            const worker = await this.workerService.create(body)
            response.status(200).send(worker)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request
            const worker = await this.workerService.update(request.params.id, body)
            response.send(worker)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const worker = await this.workerService.delete(request.params.id)
            response.status(200).send({ "status": `Successfully deleted worker with id ${request.params.id}` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })

        }
    }
}

export default WorkerController