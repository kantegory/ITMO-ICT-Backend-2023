import AutorRepository from "../repositories/Author";

const authorRepository = new AutorRepository();

class AuthorService {
  async getById(id: number) {
    return authorRepository.readById(id);
  }

  async getAll() {
    return authorRepository.readAll();
  }

  async create(name: string) {
    return authorRepository.create(name);
  }

  async update(id: number, name: string) {
    return authorRepository.update(id, name);
  }

  async delete(id: number) {
    return authorRepository.delete(id);
  }
}

export default AuthorService;
