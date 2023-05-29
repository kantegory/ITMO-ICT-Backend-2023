import Dogs from '../../models/dogs/Dogs'
import sequelize from '../../providers/db'

const dogsRepository = sequelize.getRepository(Dogs)

class DogsService {
		async getById(id: number): Promise<Dogs> {
				const dogs = await dogsRepository.findOne({ where: { 'id': id } })
				if (dogs) return dogs
				throw new Error(`Dogs ${id} not found`)
		}

		async create(dogsData: Partial<Dogs>): Promise<Dogs> {
				try {
						const dogs = await dogsRepository.create(dogsData)
						return dogs.toJSON()
				}
				catch (e: any) {
						const errors = e.errors.map((error: any) => error.message)
						throw console.log(errors)
				}
		}

		async update(id: number, dogsData: Partial<Dogs>): Promise<Dogs> {
				try {
						const dogs = await dogsRepository.findOne({ where: { 'id': id } })

						if (dogs) {
								await dogs.update(dogsData)
								return dogs.toJSON()
						}
						throw new Error(`Dogs ${id} not found`)
				}
				catch (e: any) {
						const errors = e.errors.map((error: any) => error.message)
						throw console.log(errors)
				}
		}

		async delete(id: number): Promise<void> {
				const dogs = await dogsRepository.findOne({ where: { 'id': id } })
				if (dogs) {
						await dogs.destroy()
						return
				}
				throw new Error(`Dogs ${id} not found`)
		}

		async getByBreed(id: string): Promise<any> {
			const dogs = await dogsRepository.findAll({ where: { 'breed': id } })
			if (dogs) return dogs
			throw new Error(`Dogs ${id} not found`)
	}

		async getByCompany(id: string): Promise<any> {
			const dogs = await dogsRepository.findAll({ where: { 'companyId': id } })
			if (dogs) return dogs
			throw new Error(`Dogs ${id} not found`)
	}
}

export default DogsService