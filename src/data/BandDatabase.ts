import { BaseDatabase } from "./BaseDatabase";
import { Type } from "../model/User";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'SPOTENU_Users';

    public async signupBand(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        description: string,
        type: Type
        
    ): Promise <void> {
        try {
            await this.getConnection()
            .insert({
                UserID: id,
                Name: name,
                Email: email,
                Nickname: nickname,
                Password: password,
                Description: description,
                Type: type
                
            })
            .into(BandDatabase.TABLE_NAME);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}