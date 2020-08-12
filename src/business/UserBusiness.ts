import { IdGenerator } from "../service/IdGenerator"
import { Type, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../service/HashManager";

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

    public async getByEmail(input: LoginInputDTO){

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getByEmail(input.email);
        
        console.log("user: ",user)

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(input.password, user.getPassword());
        
        if(!hashCompare){
            throw new Error('Incorrect username or password');
        }
        return user;
    }
}