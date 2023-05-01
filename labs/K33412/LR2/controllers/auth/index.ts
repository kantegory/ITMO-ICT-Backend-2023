import UserService from "../../services/user";
import { jwtOptions } from "../../core/index";

export default class AuthController {

    post = async (request: any, response: any) => {
        const { email, password } = request.body
        if (email && password) {
            const service = new UserService()
            let user = await service.getByEmail(email)
            if (!user) {
                response.status(401).json({ msg: 'No such user found', user })
            }
            if (user!!.password === password) {
                let payload = { id: user!.id }
                const jwt = require('jsonwebtoken')
                let token = jwt.sign(payload, jwtOptions.secretOrKey)
                response.json({ msg: 'ok', token: token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
}