import ExampleEntityRepository from "../repositories/ExampleEntity";

const exampleEntityRepository = new ExampleEntityRepository();

class ExampleEntityService {
  async getById(id: number) {
    return exampleEntityRepository.readById(id);
  }

  async getAll() {
    return exampleEntityRepository.readAll();
  }

  async create(value: string) {
    return exampleEntityRepository.create(value);
  }

  async update(id: number, value: string) {
    return exampleEntityRepository.update(id, value);
  }

  async delete(id: number) {
    return exampleEntityRepository.delete(id);
  }
}

export default ExampleEntityService;
