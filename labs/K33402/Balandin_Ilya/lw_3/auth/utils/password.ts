import bcrypt from 'bcrypt'
import User from '../models/user'

export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
export const checkPassword = (user: User, password: string) => bcrypt.compareSync(password, user.password)