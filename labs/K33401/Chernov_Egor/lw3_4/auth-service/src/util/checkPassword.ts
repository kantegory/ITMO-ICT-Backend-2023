import bcrypt from "bcrypt"


export default (checkPassword: any, password: string) => {
    return bcrypt.compareSync(checkPassword, password);
}