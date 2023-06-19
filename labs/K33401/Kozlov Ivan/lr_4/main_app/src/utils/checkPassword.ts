import bcrypt from 'bcrypt';

export default async (user: any, password: string) => {
  try {
    const match = await bcrypt.compare(password, user.password);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};
