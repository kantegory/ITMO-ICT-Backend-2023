import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middleware/passport'
import AuthService from '../../services/auth/Auth'

class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    register = async (request: any, response: any) => {
        try {
            const admin = await this.authService.getByEmail(request.body.email);

            if (admin) {
              response.status(400).send({ "error": "admin with specified email already exists" })
            }
        }

        catch (error: any) {
            try {
                const admin = await this.authService.create(request.body)
                response.status(201).send(admin)
            } catch (error: any) {
                response.status(400).send({ "error": error.message })
            }
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {

            const { admin, checkPassword } = await this.authService.checkPassword(email, password)

            if (checkPassword) {
                const payload = { id: admin.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                response.send({ accessToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message })
        }
    }

}

export default AuthController