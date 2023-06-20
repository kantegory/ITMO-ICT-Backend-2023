import Unit from '../../models/units/Unit'
import Warehouse from '../../models/warehouses/Warehouse'

class UnitService {
    async getById(id: number) : Promise<Unit> {
        const unit = await Unit.findByPk(id, {include: [Warehouse]})

        if (unit) return unit.toJSON()

        throw new Error('Employee not found')
    }

    async create(data: Partial<Unit>): Promise<Unit> {
        try {
            return (await Unit.create(data)).toJSON()
        } catch (e: any) {
            throw new Error(e.errors.map((error: any) => error.message))
        }
    }

    async getAll() {
        return await Unit.findAll()
    }
}

export default UnitService
