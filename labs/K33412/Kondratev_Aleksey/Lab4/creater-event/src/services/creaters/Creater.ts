import Creater from '../../models/creaters/Creater';
import sequelize from '../../providers/db';

const createrRepository = sequelize.getRepository(Creater);

class CreatersService {
    async get(id: number): Promise<Creater> {
        const creater = await createrRepository.findOne({ where: { 'id': id } });
        if (creater) return creater
        throw new Error(`Creater with id ${id} not found`);
    }

    async create(createrData: Partial<Creater>): Promise<Creater> {
        try {
            const creater = await createrRepository.create(createrData);
            return creater.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async update(id: number, createrData: Partial<Creater>): Promise<Creater> {
        try {
            const creater = await createrRepository.findOne({ where: { id } });

            if (creater) {
                await creater.update(createrData);
                return creater.toJSON();
            }
            throw new Error(`Creater with id ${id} not found`);
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async delete(id: number): Promise<void> {
        const worker = await createrRepository.findOne({ where: { id } });
        if (worker) {
            await worker.destroy();
            return;
        }
        throw new Error(`Creater with id ${id} not found`);
    }

    async getByParams(params: any): Promise<any> {
      const result = await createrRepository.findAll({ where: params });
      return result;
    }
}

export default CreatersService;