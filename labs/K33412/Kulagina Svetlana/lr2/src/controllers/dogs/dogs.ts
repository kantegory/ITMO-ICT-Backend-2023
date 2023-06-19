import DogsService from '../../services/dogs/dogs'

class DogsController {
		private dogsService: DogsService

		constructor() {
				this.dogsService = new DogsService()
		}

		get = async (request: any, response: any) => {
				try {
						const dogs = await this.dogsService.getById(
								Number(request.params.id)
						)

						response.send(dogs)
				} catch (error: any) {
						response.status(404).send({ "error": error.message })
				}
		}

		create = async (request: any, response: any) => {
				const { body } = request

				try {
						const dogs = await this.dogsService.create(body)

						response.status(200).send(dogs)
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		update = async (request: any, response: any) => {
				const { body } = request

				const id = Number(request.params.id)

				try {
						const dogs = await this.dogsService.update(id, body)

						response.send(dogs)
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		delete = async (request: any, response: any) => {
				const id = Number(request.params.id)

				try {
						await this.dogsService.delete(id)

						response.status(200).send({ message: `You deleted dogs ${id}` })
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		getByBreed = async (request: any, response: any) => {
			try {
					const dogs = await this.dogsService.getByBreed(
							String(request.params.id)
					)

					response.send(dogs)
			} catch (error: any) {
					response.status(404).send({ "error": error.message })
			}
	}

	getByCompany = async (request: any, response: any) => {
		try {
				const dogs = await this.dogsService.getByCompany(
						String(request.params.id)
				)

				response.send(dogs)
		} catch (error: any) {
				response.status(404).send({ "error": error.message })
		}
}
}

export default DogsController