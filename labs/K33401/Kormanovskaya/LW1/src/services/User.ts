import UserRepository from "../repositories/User";
import ExampleEntityService from "./ExampleEntity";

const userRepository = new UserRepository();
const exampleEntityService = new ExampleEntityService();

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

  async addExample(username: string, exampleEntityId: number) {
    const exampleEntity = await exampleEntityService.getById(exampleEntityId);
    return userRepository.updateUserExampleEntities(
      username,
      exampleEntity,
      true
    );
  }

  async deleteExample(username: string, exampleEntityId: number) {
    const exampleEntity = await exampleEntityService.getById(exampleEntityId);
    return await userRepository.updateUserExampleEntities(
      username,
      exampleEntity,
      false
    );
  }
}

export default UserService;
