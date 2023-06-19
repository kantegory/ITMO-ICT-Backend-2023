import Worker from '../../models/workers/Worker'

class WorkerService {

    async getById(id: number): Promise<Worker> {
        const worker = await Worker.findByPk(id)
        if (worker == null) {
            throw new Error("Invalid identifier")
        }
        return worker.toJSON()
    }

    async create(workerInfo: any): Promise<Worker> {
        const worker = await Worker.create(workerInfo)
        return worker.toJSON()
    }

    async update(id: number, workerData: Partial<Worker>): Promise<Worker> {
        try {
            const worker = await Worker.findByPk(id)
    
            if (worker) {
                await worker.update(workerData)
                return worker.toJSON()
            }
            throw new Error(`Worker with id ${id} not found`)
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number): Promise<void> {
        const worker = await Worker.findOne({ where: { id: id } })
        if (worker) {
            await worker.destroy()
            return
        }
        throw new Error(`Worker with id ${id} not found`)
    }
    
}

export default WorkerService