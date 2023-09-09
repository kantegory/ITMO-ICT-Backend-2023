import bcrypt from 'bcrypt'

class HashPasswordUtils {
    static hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
    
    static checkPassword(passwordToCheck: string, correctPasswordHash: string): boolean {
        return bcrypt.compareSync(passwordToCheck, correctPasswordHash);
    }
}

export default HashPasswordUtils
