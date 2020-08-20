import { BaseDatabase } from "./BaseDatabase";
import { Type } from "../model/User";
import { Band } from "../model/Band";
import { raw } from "express";

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

    public async getById (id: string): Promise<Band> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * 
                FROM ${BandDatabase.TABLE_NAME} 
                WHERE UserID="${id}"
            `)
            return Band.toBandModel(result[0][0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async approve (id: string): Promise<void> {
        try {
            await this.getConnection().raw(`
            UPDATE ${BandDatabase.TABLE_NAME}
            SET IsApproved=1
            WHERE UserID="${id}"
            `)
                        
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getByEmailOrNickname (emailOrNickname: string): Promise<any> {
        try {
            const result = await this.getConnection()
            .select('*')
            .from(BandDatabase.TABLE_NAME)
            .where({ Email: emailOrNickname }) 
            .orWhere({ Nickname: emailOrNickname });
             console.log(result[0])
            return Band.toBandModel(result[0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}