import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "SPOTENU_Users";
    
    public async signup(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: string,
        description: string,
        isApproved: number
    ) {
        try {
            await super.getConnection()
            .insert({
                id,
                name,
                email,
                nickname,
                password,
                type,
                description,
                isApproved        
            })
            .into(UserDatabase.TABLE_NAME);
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }

    }
}