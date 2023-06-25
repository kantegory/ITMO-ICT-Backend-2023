import bcrypt from 'bcrypt'

export default (password: string) : string => {
    console.log("hashing")
    return bcrypt.hashSync(password, 8)
}