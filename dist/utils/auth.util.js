import bcrypt from 'bcrypt';
export const hashPassword = async (plain) => {
    return bcrypt.hash(plain, 10);
};
export const comparePassword = async (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};
export const verifyOwner = async (nickname, password, owner) => {
    if (owner.nickname !== nickname)
        return false;
    return comparePassword(password, owner.password);
};
