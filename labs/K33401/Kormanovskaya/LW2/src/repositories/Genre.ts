import { AppDataSource } from "../database/data-source";
import { Genre } from "../models/Genre";

const genreRepository = AppDataSource.getRepository(Genre);

class GenreRepository {
  async readById(id: number) {
    return await genreRepository.findOneOrFail({
        relations: {
            books: true,
        },
        where: { id: id },
    });
  }

  async readAll() {
    return await genreRepository.find();
  }

  async create(name: string) {
    const genre = new Genre();
    genre.name = name;
    return await genreRepository.save(genre);
  }

  async update(id: number, name: string) {
    const genre = await this.readById(id);
    genre.name = name;
    return await genreRepository.save(genre);
  }

  async delete(id: number) {
    const genre = await this.readById(id);
    return await genreRepository.remove(genre);
  }
}

export default GenreRepository;
