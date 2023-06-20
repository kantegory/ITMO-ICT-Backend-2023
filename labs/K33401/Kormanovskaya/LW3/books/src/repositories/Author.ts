import { AppDataSource } from "../database/data-source";
import { Author } from "../models/Author";

const authorRepository = AppDataSource.getRepository(Author);

class AuthorRepository {
  async readById(id: number) {
    return await authorRepository.findOneOrFail({
        relations: {
            books: true,
        },
        where: { id: id },
    });
  }

  async readAll() {
    return await authorRepository.find();
  }

  async create(name: string) {
    const author = new Author();
    author.name = name;
    return await authorRepository.save(author);
  }

  async update(id: number, name: string) {
    const author = await this.readById(id);
    author.name = name;
    return await authorRepository.save(author);
  }

  async delete(id: number) {
    const genre = await this.readById(id);
    return await authorRepository.remove(genre);
  }
}

export default AuthorRepository;
