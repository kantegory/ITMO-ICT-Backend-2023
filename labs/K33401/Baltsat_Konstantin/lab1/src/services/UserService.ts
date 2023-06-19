import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        return await this.userRepository.save(user);
    }

    async getUser(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { id }});
    }
}
