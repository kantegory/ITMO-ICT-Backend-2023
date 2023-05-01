import CompaniesService from '../../services/dogs_companies/Dogs_company';

class CompaniesController {
		private companiesService: CompaniesService;

		constructor() {
				this.companiesService = new CompaniesService();
		}

		get = async (request: any, response: any) => {
				try {
						const company = await this.companiesService.get(
								Number(request.params.id)
						);

						response.send(company);
				} catch (error: any) {
						response.status(404).send({ "error": error.message });
				}
		};

		create = async (request: any, response: any) => {
				const { body } = request;

				try {
						const company = await this.companiesService.create(body);

						response.status(200).send(company);
				} catch (error: any) {
						response.status(400).send({ "error": error.message });
				}
		};

		update = async (request: any, response: any) => {
				const { body } = request;
				const id = Number(request.params.id);

				try {
						const worker = await this.companiesService.update(id, body);

						response.send(worker);
				} catch (error: any) {
						response.status(400).send({ "error": "error" });
				}
		};

		delete = async (request: any, response: any) => {
				const id = Number(request.params.id)

				try {
						await this.companiesService.delete(id);

						response.status(200).send({ message: `You deleted company ${id}` });
				} catch (error: any) {
						response.status(400).send({ "error": error.message });

				}
		}

		getByOwner = async (request: any, response: any) => {
			try {
					const company = await this.companiesService.getByOwner(
							String(request.params.id)
					);

					response.send(company);
			} catch (error: any) {
					response.status(404).send({ "error": error.message });
			}
	};
}

export default CompaniesController;