import UserService from "../../services/user/UserService";
import { options } from "../../middleware";

export default class AuthController {

    login = async (request: any, response: any) => {
        const email = request.body.email
        const password = request.body.password
        if (email && password) {
            const service = new UserService()
            let user = await service.getByEmail(email)
            if (!user) {
                response.status(401).json({ status: 'User not found', user })
            } else {
                if (user!!.password === password) {
                    let payload = { id: user!.id }
                    const jwt = require('jsonwebtoken')
                    let token = jwt.sign(payload, options.secretOrKey)
                    response.json({ status: 'Success', token: token })
                } else {
                    response.status(401).json({ status: 'Password is incorrect' })
                }
            }
        }
    }
}