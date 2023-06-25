import Place from '../models/place'
import PlaceError from '../errors/place'

class PlaceService {
    async getById(id: number) : Promise<Place> {
        const place = await Place.findByPk(id)

        if (place) return place.toJSON()

        throw new PlaceError('Not found!')
    }

    async create(eventData: Partial<Place>): Promise<Place> {
        try {
            const place = await Place.create(eventData)

            return place.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new PlaceError(errors)
        }
    }

    async getAll() {
        const places = await Place.findAll()

        if (places) return places

        throw new PlaceError('Events are not found')
    }

    async delete(id: number) {
        const place: Place | null = await Place.findByPk(id)
        if (place == null) {
            throw new Error("Invalid identifier")
        }

        return await place.destroy()
    }
}

export default PlaceService