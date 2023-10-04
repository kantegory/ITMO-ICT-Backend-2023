import EmpService from "../services/employee";

class EmpController {
    private empService: EmpService
    constructor() {
        this.empService = new EmpService()
    }

    get = async (request: any, response: any) => {
        try {
            const emps = await this.empService.getAll()
            return response.json(emps);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }

    getbyId = async (request: any, response: any) => {
        try {
            const emp = await this.empService.getById(request.params.id)
            return response.json(emp);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getbyPosition = async (request: any, response: any) => {
        try {
            const emp = await this.empService.getByPosition(request.params.position)
            return response.json(emp);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        try {
            const { body } = request
            const emp = await this.empService.create(body);
            return response.json({ emp, msg: "created" })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const emp = await this.empService.update(request.params.id, body)
            return response.json({ emp, msg: 'Update was succesful' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const emp = await this.empService.delete(request.params.id)
            return response.json({ msg: 'Deletion was succesful' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}


export default EmpController