import bcrypt from 'bcrypt';

export default async (user: any, password: string) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log(error);
    return false;
  }
};
