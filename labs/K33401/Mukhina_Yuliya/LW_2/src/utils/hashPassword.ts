import bcrypt from 'bcrypt'

export default (password: string): string => bcrypt.hashSync(password, bcrypt.genSaltSync(8))