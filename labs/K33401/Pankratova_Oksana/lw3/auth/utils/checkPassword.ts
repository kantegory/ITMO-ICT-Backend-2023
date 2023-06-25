import bcrypt from "bcrypt"

export default (user: any, password: string) => {
    // console.log(user.password, password)
    // console.log(bcrypt.compareSync(password, user.password))
    // return true
    return bcrypt.compareSync(password, user.password)
}