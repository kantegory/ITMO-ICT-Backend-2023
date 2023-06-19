import { createHash } from "crypto";

function passwordHash(password: string): string {
    return createHash('sha512').update(password).digest('base64').toString()
}

export { passwordHash }