import bcrypt from 'bcrypt'
import User from '../model/user'

export const checkPassword = (user: User, password: string) => {
  return bcrypt.compareSync(password, user.password);
}

export default checkPassword;