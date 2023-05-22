import AuthorService from "../../services/authors/Author"
import { jwtOptionsAuthor } from '../../middlewares/passportAuthor'
import jwt from 'jsonwebtoken'

export class AuthorController {
    private authorService: AuthorService;

    constructor() {
        this.authorService = new AuthorService();
    }

    signup = async (request: any, response: any) => {
        const { body } = request
        try {
            await this.authorService.create(body)
            response.status(200).send({ "status" : "OK" })
        } catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request
        const { email, password } = body
        try {
            const { author, checkPassword } = await this.authorService.checkPassword(email, password)
            if (checkPassword) {
                const payload = { id: author.id }
                console.log('payload is', payload)
                const accessToken = jwt.sign(payload, jwtOptionsAuthor.secretOrKey)
                response.send({accessToken: accessToken})
            }
        } catch (error: any) {
            response.status(401).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.author)
    }

    get = async (request: any, response: any) => {
        try {
            const author = await this.authorService.getByID(
                Number(request.params.id)
            )

            response.send(author)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}