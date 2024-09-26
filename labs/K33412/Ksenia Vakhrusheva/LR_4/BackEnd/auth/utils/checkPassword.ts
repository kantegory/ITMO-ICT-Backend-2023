import bcrypt from 'bcrypt'
import User from '../models/user'

export const checkPassword = (user: User, password: string) => {
  return bcrypt.compareSync(password, user.password);
}

export default checkPassword;