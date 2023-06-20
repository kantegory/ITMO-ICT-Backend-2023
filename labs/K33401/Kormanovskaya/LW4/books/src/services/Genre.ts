import GenreRepository from "../repositories/Genre";

const genreRepository = new GenreRepository();

class GenreService {
    async getById(id: number) {
        return genreRepository.readById(id);
    }

    async getAll() {
        return genreRepository.readAll();
    }

    async create(name: string) {
        return genreRepository.create(name);
    }

    async update(id: number, name: string) {
        return genreRepository.update(id, name);
    }

    async delete(id: number) {
        return genreRepository.delete(id);
    }
}

export default GenreService;