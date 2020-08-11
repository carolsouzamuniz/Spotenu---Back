import { BaseDatabase } from "./BaseDatabase";
import { Type } from "../model/User";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "SPOTENU_Users";
    
    public async signup(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: Type,
        description: string,
        isApproved: number
    ): Promise <void> {
        try {
            await this.getConnection()
            .insert({
                UserID: id,
                Name: name,
                Email: email,
                Nickname: nickname,
                Password: password,
                Type: type,
                Description: description,
                IsApproved: isApproved
            })
            .into(UserDatabase.TABLE_NAME);
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }

    }
}