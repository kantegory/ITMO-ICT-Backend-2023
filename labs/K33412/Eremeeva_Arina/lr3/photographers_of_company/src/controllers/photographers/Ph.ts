import PhotographersService from '../../services/photographers/Ph'

class PhotographersController {
		private photographersService: PhotographersService

		constructor() {
				this.photographersService = new PhotographersService()
		}

		get = async (request: any, response: any) => {
				try {
						const photo = await this.photographersService.getById(
								Number(request.params.id)
						)

						response.send(photo)
				} catch (error: any) {
						response.status(404).send({ "error": error.message })
				}
		}

		create = async (request: any, response: any) => {
				const { body } = request

				try {
						const photo = await this.photographersService.create(body)

						response.status(200).send(photo)
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		update = async (request: any, response: any) => {
				const { body } = request

				const id = Number(request.params.id)

				try {
						const photo = await this.photographersService.update(id, body)

						response.send(photo)
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		delete = async (request: any, response: any) => {
				const id = Number(request.params.id)

				try {
						await this.photographersService.delete(id)

						response.status(200).send({ message: `You deleted photographers ${id}` })
				} catch (error: any) {
						response.status(400).send({ "error": error.message })
				}
		}

		getBySurname = async (request: any, response: any) => {
			try {
					const photo = await this.photographersService.getBySurname(
							String(request.params.id)
					)

					response.send(photo)
			} catch (error: any) {
					response.status(404).send({ "error": error.message })
			}
	}

	getByCompany = async (request: any, response: any) => {
		try {
				const photo = await this.photographersService.getByCompany(
						String(request.params.id)
				)

				response.send(photo)
		} catch (error: any) {
				response.status(404).send({ "error": error.message })
		}
}
}

export default PhotographersController