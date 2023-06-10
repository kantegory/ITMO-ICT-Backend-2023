import Worker from '../../models/workers/Workers';
import sequelize from '../../providers/db';

const workersRepository = sequelize.getRepository(Worker);

class WorkersService {
    async get(id: number): Promise<Worker> {
        const worker = await workersRepository.findOne({ where: { 'id': id } });
        if (worker) return worker
        throw new Error(`Worker with id ${id} not found`);
    }

    async create(workerData: Partial<Worker>): Promise<Worker> {
        try {
            const worker = await workersRepository.create(workerData);
            return worker.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async update(id: number, workerData: Partial<Worker>): Promise<Worker> {
        try {
            const worker = await workersRepository.findOne({ where: { id } });

            if (worker) {
                await worker.update(workerData);
                return worker.toJSON();
            }
            throw new Error(`Worker with id ${id} not found`);
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async delete(id: number): Promise<void> {
        const worker = await workersRepository.findOne({ where: { id } });
        if (worker) {
            await worker.destroy();
            return;
        }
        throw new Error(`Worker with id ${id} not found`);
    }
    
}

export default WorkersService;
