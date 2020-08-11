import { IdGenerator } from "../service/IdGenerator"
import { Type } from "../model/User";

export class UserBusiness {
    public async signup(
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: Type,
        description: string,
        isApproved: number
    ): Promise<string> {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        return id;
    }
}