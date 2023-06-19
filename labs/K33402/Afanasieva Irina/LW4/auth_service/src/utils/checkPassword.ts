import User from '../models/users/User'
import encodePassword from './encodePassword'

export default (user: User, password: string): boolean => {
    return user.password === encodePassword(password, user.salt)
}
