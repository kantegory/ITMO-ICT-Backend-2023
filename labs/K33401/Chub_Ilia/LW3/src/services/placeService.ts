import PlaceModel from '../models/placeModel'
import PlaceError from '../errors/placeError'

class PlaceService {
    async findById(id: number): Promise<PlaceModel> {
        const place: PlaceModel | null = await PlaceModel.findByPk(id)
        if (place) return place.toJSON()
        throw new PlaceError('Not found!')
    }

    async getById(id: number): Promise<PlaceModel> {
        return await this.findById(id)
    }

    async getAll(): Promise<PlaceModel[]> {
        return await PlaceModel.findAll()
    }

    async update(id: number, placeData: object): Promise<PlaceModel | PlaceError> {
        try {
            await this.findById(id)
            await PlaceModel.update(placeData, {where: {id}})
            return await this.findById(id)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new PlaceError(errors)
        }
    }

    async delete(id: number): Promise<PlaceModel> {
        try {
            const deletedPlace: PlaceModel = await this.findById(id)
            await PlaceModel.destroy({where: {id}})
            return deletedPlace
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new PlaceError(errors)
        }
    }

    async create(placeData: any): Promise<PlaceModel | PlaceError> {
        try {
            const place = await PlaceModel.create(placeData)
            return place.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new PlaceError(errors)
        }
    }
}

export default PlaceService
