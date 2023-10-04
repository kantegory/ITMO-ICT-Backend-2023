import {createHash} from 'crypto';

export default (password: string, salt: string): string => {
    return createHash('sha256').update(password + salt).digest('base64')
}