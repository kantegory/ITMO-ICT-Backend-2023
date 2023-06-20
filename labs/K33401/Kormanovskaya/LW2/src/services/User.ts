import UserRepository from "../repositories/User";

const userRepository = new UserRepository();

class UserService {
    async getAll() {
        return await userRepository.readAll();
    }

    async getByUsername(username: string) {
        return userRepository.readOneByUsername(username);
    }

    async createNewUser(username: string, password: string) {
        return userRepository.createUser(username, password);
    }
}

export default UserService;
