import * as dotenv from "dotenv";
import bcrypt from "bcrypt"


export default (password: string) => {
    return bcrypt.hashSync(password, parseInt(process.env.SALT));
}