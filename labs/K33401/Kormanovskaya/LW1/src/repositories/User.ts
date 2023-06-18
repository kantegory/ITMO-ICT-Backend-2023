import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import { ExampleEntity } from "../models/ExampleEntity";

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
      relations: {
        exampleEntities: true,
      },
      where: { username: username },
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

  async updateUserExampleEntities(
    username: string,
    exampleEntity: ExampleEntity,
    add: boolean
  ) {
    const user = await this.readOneByUsername(username);
    if (add) {
      await userRepository
        .createQueryBuilder()
        .relation(User, "exampleEntities")
        .of(user)
        .add(exampleEntity);
    } else {
      await userRepository
        .createQueryBuilder()
        .relation(User, "exampleEntities")
        .of(user)
        .remove(exampleEntity);
    }
    return await this.readOneByUsername(username);
  }
}

export default UserRepository;
