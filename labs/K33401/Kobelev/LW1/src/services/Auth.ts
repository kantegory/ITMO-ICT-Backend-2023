import UserRepository from '../repositories/User'

const userRepository = new UserRepository()

class AuthService {
    async getUserTokenVersion(id: number) {
        return userRepository.ReadTokenVersion(id)
    }

    async login(username: string, password: string) {}
}

export default AuthService
