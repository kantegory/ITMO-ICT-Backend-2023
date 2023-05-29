import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"


export default (token: string) => {
    try {
        return { payload: jwt.verify(token, process.env.SECRET_KEY), isExpired: false }
    } catch (error) {
        if ((error as Error).name == "TokenExpiredError") {
            return { payload: jwt.decode(token), isExpired: true }
        }
        throw error
    }
}