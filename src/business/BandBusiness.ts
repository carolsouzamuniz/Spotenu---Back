import { IdGenerator } from "../service/IdGenerator";
import { Type } from "../model/User";

export class BandBusiness {
    public async signupBand(
        name: string,
        email: string,
        nickname: string,
        password: string,
        description: string,
        type: Type
        // isApproved: number
    ): Promise <string> {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        return id;
    }

}