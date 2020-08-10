import { IdGenerator } from "../service/IdGenerator"

export class UserBusiness {
    public async signup(
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: string,
        description: string,
        isApproved: number
    ): Promise<string> {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        return id;
    }
}