import CreaterService from '../../services/creaters/Creater';

class CreaterController {
    private createrService: CreaterService;

    constructor() {
        this.createrService = new CreaterService();
    }

    get = async (request: any, response: any) => {
        try {
            const creater = await this.createrService.get(Number(request.params.id));
            response.send(creater);
        } catch (error: any) {
            response.status(404).send({ "error": error.message });
        }
    };

    create = async (request: any, response: any) => {
        const { body } = request;
        try {
            const creater = await this.createrService.create(body);
            response.status(200).send(creater);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    };

    update = async (request: any, response: any) => {
        const { body } = request;
        const id = Number(request.params.id);
        try {
            const creater = await this.createrService.update(id, body);
            response.send(creater);
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    };

    delete = async (request: any, response: any) => {
        const id = Number(request.params.id);
        try {
            await this.createrService.delete(id);
            response.status(200).send({ message: `Creater with id ${id} has been deleted` });
        } catch (error: any) {
            response.status(400).send({ "error": error.message });
        }
    }

    getByParams = async (request: any, response: any) => {
      const params = request.body
      try {
          const event = await this.createrService.getByParams(params)
          response.send(event)
      } catch (error: any) {
          response.status(404).send({ "error": error.message })
      }
  }
}

export default CreaterController;
