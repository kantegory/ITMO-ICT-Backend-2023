import { AppDataSource } from "../database/data-source";
import { ExampleEntity } from "../models/ExampleEntity";

const exampleEntityRepository = AppDataSource.getRepository(ExampleEntity);

class ExampleEntityRepository {
  async readById(id: number) {
    return await exampleEntityRepository.findOneByOrFail({
      id: id,
    });
  }

  async readAll() {
    return await exampleEntityRepository.find();
  }

  async create(value: string) {
    const exampleEntity = new ExampleEntity();
    exampleEntity.value = value;
    return await exampleEntityRepository.save(exampleEntity);
  }

  async update(id: number, value: string) {
    const exampleEntity = await this.readById(id);
    exampleEntity.value = value;
    return await exampleEntityRepository.save(exampleEntity);
  }

  async delete(id: number) {
    const exampleEntity = await this.readById(id);
    return await exampleEntityRepository.delete(exampleEntity);
  }
}

export default ExampleEntityRepository;
