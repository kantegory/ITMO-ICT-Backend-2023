import Briefcase from '../../models/briefcases/Briefcase'
import BriefcaseError from '../../errors/briefcases/Briefcase'

class BriefcaseService {
    async getById(id: number) : Promise<Briefcase> {
        const briefcase = await Briefcase.findByPk(id)
        

        if (briefcase) return briefcase.toJSON()

        throw new BriefcaseError('currency not found')
    }

    async create(briefcaseData: object) : Promise<Briefcase|BriefcaseError> {
        try {
            const briefcase = await Briefcase.create(briefcaseData)

            return briefcase.toJSON()
        } 
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new BriefcaseError(errors)
        }
    }

    async delete(id: number){
        try {
            return await Briefcase.destroy({where: {id: id}})
        }
        catch(e: any) {

            throw new Error(e)
        }
    }

    async update(id: number, newCount: object) {
        try {
            const briefcase = await Briefcase.update(newCount, {where: {id: id}})

            return this.getById(id)
        }
        catch (e: any){
            throw new Error(e)
        }
    }

    async getAllByUser(id: number) {
        console.log(id)
        
        const briefcase = await Briefcase.findAll({where: {userId: id}})

        if (briefcase) return briefcase

        throw new BriefcaseError('briefcase for user not found')
    }
}

export default BriefcaseService
