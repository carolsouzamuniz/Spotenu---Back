import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { HashManager } from "../service/HashManager";
import { BandDatabase } from "../data/BandDatabase";
import { BandBusiness } from "../business/BandBusiness";

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
}