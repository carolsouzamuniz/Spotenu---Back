import { IdGenerator } from "../service/IdGenerator"
import { Type, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../service/HashManager";

export class UserBusiness {
    public async signupUser(
        name: string,
        email: string,
        nickname: string,
        password: string
    ): Promise<string> {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        
        return id;
    }

    public async signupAdmin(
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: Type,
    ): Promise<string> {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        
        return id;
    }

    public async getByEmailOrNickname(input: LoginInputDTO){
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getByEmailOrNickname(input.emailOrNickname);
        
        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(input.password, user.getPassword());
        
        if(!hashCompare){
            throw new Error('Incorrect username or password');
        }
        return user;
    }
}