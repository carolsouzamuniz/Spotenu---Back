import { Response, Request } from "express";
import { HashManager } from "../service/HashManager";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../service/Authenticator";
import { UserInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";

export class UserController{

    public async signup (req: Request, res: Response){
        try {
            const userData: UserInputDTO = {
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
            const hashPassword = await hashManager.hash(userData.password);

            const userBusiness = new UserBusiness();
            const userId = await userBusiness.signup(
                userData.name,
                userData.email,
                userData.nickname,
                hashPassword,
                userData.type,
                userData.description,
                userData.isApproved
            );

            const userDatabase = new UserDatabase();
            await userDatabase.signup(
                userId,
                userData.name,
                userData.email,
                userData.nickname,
                hashPassword,
                userData.type,
                userData.description,
                userData.isApproved
            );

            const autheticator = new Authenticator();
            const accessToken = autheticator.generateToken({id: userId})
            
            res.status(200).send({
                message: "User successfully registered",
                token: accessToken});
        
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
}