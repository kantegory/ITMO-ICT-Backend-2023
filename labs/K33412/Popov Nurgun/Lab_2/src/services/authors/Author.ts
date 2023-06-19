import Author from "../../models/authors/Author"
import checkPassword from '../../utils/checkPassword'

class AuthorService {
    async create(authorData: any): Promise<Author> {
        const author = await Author.create(authorData)
        return author.toJSON()
    }

    async getByID(id: number): Promise<Author|Error> {
        const author = await Author.findByPk(id)

        if (author) {
            return author.toJSON()
        }
        throw new Error(`Author with id ${id} not found`)
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const author = await Author.findOne({ where: { email: email }})

        if (author) {
            return {author: author.toJSON(), checkPassword: checkPassword(author, password)}
        }
        throw new Error('Login or password is incorrect!')
    }
}

export default AuthorService