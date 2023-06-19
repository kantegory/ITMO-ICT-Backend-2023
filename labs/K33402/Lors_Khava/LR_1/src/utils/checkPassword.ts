import bcrypt from "bcrypt"

export default (user: any, password: string) => {
    return bcrypt.compareSync(password, user.password)
}