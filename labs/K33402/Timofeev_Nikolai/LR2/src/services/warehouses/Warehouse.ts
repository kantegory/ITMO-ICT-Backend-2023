import Employee from "../../models/empoyees/Employee"
import Unit from "../../models/units/Unit"
import Warehouse from "../../models/warehouses/Warehouse"

class WarehouseService {
    async getById(id: number) : Promise<Warehouse> {
        const employee = await Warehouse.findByPk(id, {include: [Employee, Unit]})

        if (employee) return employee.toJSON()

        throw new Error('Warehouse not found')
    }

    async create(data: Partial<Warehouse>): Promise<Warehouse> {
        try {
            return (await Warehouse.create(data)).toJSON()
        } catch (e: any) {
            throw new Error(e.errors.map((error: any) => error.message))
        }
    }

    async getAll() {
        return await Warehouse.findAll()
    }
}

export default WarehouseService
