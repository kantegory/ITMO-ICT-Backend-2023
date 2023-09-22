"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * The `HashPasswordUtils` class provides utility methods for hashing and checking passwords.
 */
class HashPasswordUtils {
    /**
     * Hashes a plaintext password using bcrypt.
     * @param password - The plaintext password to hash.
     * @returns A bcrypt-hashed representation of the password.
     */
    static hashPassword(password) {
        return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(8));
    }
    /**
     * Compares a plaintext password to a bcrypt-hashed password to check if they match.
     * @param passwordToCheck - The plaintext password to check.
     * @param correctPasswordHash - The bcrypt-hashed password to compare against.
     * @returns `true` if the plaintext password matches the hashed password, `false` otherwise.
     */
    static checkPassword(passwordToCheck, correctPasswordHash) {
        return bcrypt_1.default.compareSync(passwordToCheck, correctPasswordHash);
    }
}
exports.default = HashPasswordUtils;
