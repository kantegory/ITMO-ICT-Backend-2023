import {randomBytes} from 'crypto';

export default (): string => {
    return randomBytes(16).toString('base64');
}