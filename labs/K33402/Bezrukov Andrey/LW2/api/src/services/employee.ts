import Employee from "../models/employee";

class EmpService {
    async create(empInfo: any) {
        try {
            const emp = await Employee.create(empInfo)
            return emp
        } catch (e: any) {
            throw new Error(e)
        }
        }

    async getAll(){
        const prods = await Employee.findAll()

        if (prods) return prods
        else return { "message": "Employees were not found" }

    }
    
    async getById(id: number) {
        const emp = await Employee.findByPk(id)

        if (emp) return emp

        throw new Error(`Employee with id ${id} was not found`)
    }

    async getByPosition(position: string) {
        const emp = await Employee.findAll({ where: { position: position} })

        if (emp) return emp

        throw new Error(`Employee with position ${position} was not found`)
    }
    
    async update(id:number, data: any) {
        try {
            const emp = await Employee.findByPk(id)
            if (emp) {
                emp.update(data)
            }
            return emp
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id:number) {
        try {
            await Employee.destroy({where: {id:id}})
        } catch (e: any) {
            throw new Error(e)
        }
    }
}

export default EmpService