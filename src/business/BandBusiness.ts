import { IdGenerator } from "../service/IdGenerator";
import { Type } from "../model/User";
import { BandDatabase } from "../data/BandDatabase";
import { HashManager } from "../service/HashManager";
import { LoginBandInputDTO } from "../model/Band";

export class BandBusiness {
    public async signupBand(
        name: string,
        email: string,
        nickname: string,
        password: string,
        description: string,
        type: Type,
        isApproved: number
    ): Promise <string> {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        return id;
    }

    public async getById(id: string){

        const bandDatabase = new BandDatabase();
        const band = await bandDatabase.getById(id);
        
        if(!band) {
            throw new Error ('Band not found')
        } 

        if(band.getIsApproved() === 1) {
            throw new Error ('User already approved')
        }
        return band;
    }

    public async approve (id: string) {
        const bandDatabase = new BandDatabase();
        await bandDatabase.approve(id);
    }

    public async getByType (type: Type) {
        const bandDatabase = new BandDatabase();
        await bandDatabase.getAllBands();
    }
}