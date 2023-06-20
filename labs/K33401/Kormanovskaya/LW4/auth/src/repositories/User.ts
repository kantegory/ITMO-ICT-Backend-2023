import {AppDataSource} from "../database/data-source";
import {User} from "../models/User";

const userRepository = AppDataSource.getRepository(User);

class UserRepository {
    async readAll() {
        return await userRepository.find({
            select: ["id", "username"],
        });
    }

    async readOneByUsername(username: string) {
        return await userRepository.findOneOrFail({
            select: ["id", "username", "password", "tokenVersion"],
            where: {username: username},
        });
    }

    async updateTokenVersion(username: string) {
        const user = await this.readOneByUsername(username);
        user.tokenVersion += 1;
        await userRepository.save(user);
        return user.tokenVersion;
    }

    async createUser(username: string, password: string) {
        const user = new User();
        user.username = username;
        user.password = password;
        user.tokenVersion = 1;
        user.hashPassword();
        return await userRepository.save(user);
    }
}

export default UserRepository;
