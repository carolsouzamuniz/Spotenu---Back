import * as bcrypt from 'bcryptjs';

export class HashManager {

    public async hash(text: string): Promise<string> {

        const rounds = Number(process.env.BCRYPT_ROUNDS);
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);

        return result;
    };

    public async compare(text: string, hash: string): Promise<boolean> {

        return bcrypt.compare(text, hash);
    };
};