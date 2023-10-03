import axios from "axios"

export default class LoginController {

    login = async (request: any, response: any) => {
        const email = request.body.email
        const password = request.body.password
        if (email && password) {
            let result = await axios.get("http://lr4-other-1:8000/lwth/getUserByEmail?email="+email)
            let user = result.data
            if (!user) {
                response.status(401).json({ status: 'User not found', user })
            } else {
                if (user!!.password === password) {
                    let payload = { id: user!.id }
                    const jwt = require('jsonwebtoken')
                    let token = jwt.sign(payload, "secretKey")
                    response.json({ status: 'Success', token: token })
                } else {
                    response.status(401).json({ status: 'Password is incorrect' })
                }
            }
        }
    }
}