class UserService {
    async getById(id: number): Promise<void> {}

    async create(userData: object): Promise<void> {}

    async checkPassword(email: string, password: string): Promise<any> {}
}

export default UserService;
