import Ph from '../../models/photographers/Ph'
import sequelize from '../../providers/db'

const photoRepository = sequelize.getRepository(Ph)

class PhotographersService {
		async getById(id: number): Promise<Ph> {
				const photo = await photoRepository.findOne({ where: { 'id': id } })
				if (photo) return photo
				throw new Error(`Photographers ${id} not found`)
		}

		async create(photoData: Partial<Ph>): Promise<Ph> {
				try {
						const photo = await photoRepository.create(photoData)
						return photo.toJSON()
				}
				catch (e: any) {
						const errors = e.errors.map((error: any) => error.message)
						throw console.log(errors)
				}
		}

		async update(id: number, photoData: Partial<Ph>): Promise<Ph> {
				try {
						const photo = await photoRepository.findOne({ where: { 'id': id } })

						if (photo) {
								await photo.update(photoData)
								return photo.toJSON()
						}
						throw new Error(`Photographers ${id} not found`)
				}
				catch (e: any) {
						const errors = e.errors.map((error: any) => error.message)
						throw console.log(errors)
				}
		}

		async delete(id: number): Promise<void> {
				const photo = await photoRepository.findOne({ where: { 'id': id } })
				if (photo) {
						await photo.destroy()
						return
				}
				throw new Error(`Photographers ${id} not found`)
		}

		async getBySurname(id: string): Promise<any> {
			const photo = await photoRepository.findAll({ where: { 'surname': id } })
			if (photo) return photo
			throw new Error(`Photographers ${id} not found`)
	}

		async getByCompany(id: string): Promise<any> {
			const photo = await photoRepository.findAll({ where: { 'companyId': id } })
			if (photo) return photo
			throw new Error(`Photographers ${id} not found`)
	}
}

export default PhotographersService