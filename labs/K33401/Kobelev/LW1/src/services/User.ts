import {AppDataSource} from "../database/data-source";
import {User} from "../models/User";

const userRepository = AppDataSource.getRepository(User)

class UserService {
    async getById(id: number) {
        const user = await userRepository.findOneByOrFail({
            id: id
        })

        return user
    }
}

export default UserService