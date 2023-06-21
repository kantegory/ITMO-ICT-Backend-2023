import Employee from "../models/employees/Employee"

class EmployeeService {
    async getById(id: number) : Promise<Employee> {
        const employee = await Employee.findByPk(id)

        if (employee) return employee

        throw new Error('Employee not found')
    }

    async create(data: Partial<Employee>): Promise<Employee> {
        try {
            return (await Employee.create(data)).toJSON()
        } catch (e: any) {
            throw new Error(e.errors.map((error: any) => error.message))
        }
    }

    async getAll() {
        return await Employee.findAll()
    }

    async changeStatus(id: number): Promise<Employee> {
        const employee = await this.getById(id)
        if (!employee) throw new Error('Employee not found')
        await employee.update({active: !employee.active})
        return employee
    }
}

export default EmployeeService