import bcrypt from 'bcrypt';

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, 10);
};

export const comparePassword = async (
  plain: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

export const verifyOwner = async (
  nickname: string,
  password: string,
  owner: { nickname: string; password: string },
): Promise<boolean> => {
  if (owner.nickname !== nickname) return false;
  return comparePassword(password, owner.password);
};
