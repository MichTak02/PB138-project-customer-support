import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function createPasswordHash(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing password');
    }
}