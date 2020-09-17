import { BaseDatabase } from "./BaseDatabase";
import { Type, User } from "../model/User";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "SPOTENU_Users";
    
    public async signupUser(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        // type: Type,
        // description: string,
        // isApproved: number
    ): Promise <void> {
        try {
            await this.getConnection()
            .insert({
                UserID: id,
                Name: name,
                Email: email,
                Nickname: nickname,
                Password: password,
                // Type: type,
                // Description: description,
                // IsApproved: isApproved
            })
            .into(UserDatabase.TABLE_NAME);
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }

    }

    public async signupAdmin(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
    ): Promise <void> {
        try {
            await this.getConnection()
            .insert({
                UserID: id,
                Name: name,
                Email: email,
                Nickname: nickname,
                Password: password,
                Type: "ADMIN"
            })
            .into(UserDatabase.TABLE_NAME);
                      
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getByEmailOrNickname (emailOrNickname: string): Promise<User> {
        try {
            const result = await this.getConnection()
            .select('*')
            .from(UserDatabase.TABLE_NAME)
            .where({ Email: emailOrNickname }) 
            .orWhere({ Nickname: emailOrNickname });
             
            return User.toUserModel(result[0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
        
      }
}