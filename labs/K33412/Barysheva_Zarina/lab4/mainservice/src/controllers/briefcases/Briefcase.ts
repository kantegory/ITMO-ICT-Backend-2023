import Briefcase from '../../models/briefcases/Briefcase'
import BriefcaseService from '../../services/briefcases/Briefcase'
import BriefcaseError from '../../errors/briefcases/Briefcase'


class BriefcaseController {
    private briefcaseService: BriefcaseService

    constructor() {
        this.briefcaseService = new BriefcaseService()
    }

    getAll = async (request: any, response: any) => {
        const id = request.params.userId
        console.log(id);
        
        try {
            const briefcase: Briefcase[] | BriefcaseError = await this.briefcaseService.getAllByUser(
                Number(id)
            )

            response.send(briefcase)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getOne = async (request: any, response: any) => {
        const caseId = request.params.caseId
        console.log(caseId);
        

        try {
            const briefcase: Briefcase | BriefcaseError = await this.briefcaseService.getById(
                caseId
            )

            response.send(briefcase)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const briefcase : Briefcase|BriefcaseError = await this.briefcaseService.create(body)

            response.status(201).send(briefcase)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const caseId = request.params.caseId

        try {
            const briefcase: number|BriefcaseError = await this.briefcaseService.delete(
                Number(caseId)
            )

            response.status(201).send({status: 'deleted'})
        }
        catch(e: any){
            response.status(400).send({ "error": e.message })
        }
    }

    update = async (request: any, response: any) => {
        const body = request.body
        const caseId = request.params.caseId
        try {
            const briefcase: any = await this.briefcaseService.update(
                caseId, body
            )

            response.status(201).send(briefcase)
        }
        catch(e: any){
            response.status(400).send({ "error": e.message })
        }
    }

}

export default BriefcaseController
