import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { HashManager } from "../service/HashManager";
import { BandDatabase } from "../data/BandDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { Authenticator } from "../service/Authenticator";
import { bandRouter } from "../routes/bandRouter";

export class BandController {
    public async signupBand (req: Request, res: Response) {
        try {
            const bandData = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                type: req.body.type,
                description: req.body.description,
                isApproved: req.body.isApproved
            }

            if (!req.body.name || req.body.name === "") {
                throw new Error("Invalid name / empty field")
    
            }
            if (!req.body.email || req.body.email.indexOf("@") === -1) {
                throw new Error("Invalid email")
            }
    
            if (!req.body.password || req.body.password.length < 6) {
                throw new Error("The password must contain at least 6 characters")
            }

            if (!req.body.description || req.body.description === "") {
                throw new Error("Make a short text that describes your band")
            }


            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(bandData.password);

            const bandBusiness = new BandBusiness();
            const bandId = await bandBusiness.signupBand(
                bandData.name,
                bandData.email,
                bandData.nickname,
                hashPassword,
                bandData.description,
                bandData.type,
                
            );

            const bandDatabase = new BandDatabase();
            await bandDatabase.signupBand(
                bandId,
                bandData.name,
                bandData.email,
                bandData.nickname,
                hashPassword,
                bandData.description,
                bandData.type
            );

            res.status(200).send({
                message: "User successfully registered! Waiting for approval from an administrator."
            });

        } catch (error) {
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

    public async bandApproval(req: Request, res: Response) {
        try {
            const autheticator = new Authenticator();
            const tokenData = autheticator.getData(req.headers.authenticator as string)
            
            if(tokenData.type !== "ADMIN"){
                throw new Error('Only administrators can approve the band registration')
            }
            const bandBusiness = new BandBusiness();
            const bandResult = await bandBusiness.getById(req.body.id);

            await bandBusiness.approve(bandResult.getId());
            
            res.status(200).send({
                message: "Band successfully approved"
            });
        
        } catch (error) {
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

}