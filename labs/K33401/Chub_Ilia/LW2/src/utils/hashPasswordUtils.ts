import bcrypt from 'bcrypt';

/**
 * The `HashPasswordUtils` class provides utility methods for hashing and checking passwords.
 */
class HashPasswordUtils {
    /**
     * Hashes a plaintext password using bcrypt.
     * @param password - The plaintext password to hash.
     * @returns A bcrypt-hashed representation of the password.
     */
    static hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    /**
     * Compares a plaintext password to a bcrypt-hashed password to check if they match.
     * @param passwordToCheck - The plaintext password to check.
     * @param correctPasswordHash - The bcrypt-hashed password to compare against.
     * @returns `true` if the plaintext password matches the hashed password, `false` otherwise.
     */
    static checkPassword(passwordToCheck: string, correctPasswordHash: string): boolean {
        return bcrypt.compareSync(passwordToCheck, correctPasswordHash);
    }
}

export default HashPasswordUtils;
