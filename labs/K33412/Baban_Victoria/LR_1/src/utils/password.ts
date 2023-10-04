import bcrypt from "bcrypt";

function hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

function checkPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
}

export { hashPassword, checkPassword }
