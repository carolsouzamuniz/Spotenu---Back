import { Response, Request } from "express";
import { HashManager } from "../service/HashManager";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../service/Authenticator";
import { UserInputDTO, LoginInputDTO, Type } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { IdGenerator } from "../service/IdGenerator";

export class UserController{

    public async signupUser (req: Request, res: Response){
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
            const userId = await userBusiness.signupUser(
                userData.name,
                userData.email,
                userData.nickname,
                hashPassword,
                // userData.type,
                // userData.description,
                // userData.isApproved
            );

            const userDatabase = new UserDatabase();
            await userDatabase.signupUser(
                userId,
                userData.name,
                userData.email,
                userData.nickname,
                hashPassword,
                // userData.type,
                // userData.description,
                // userData.isApproved
            );

            const autheticator = new Authenticator();
            const accessToken = autheticator.generateToken({id: userId, type: userData.type})
            
            res.status(200).send({
                message: "User successfully registered",
                token: accessToken});
        
        } catch (error) {
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

    public async signupAdmin (req: Request, res: Response){
        try {
            const userData = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                type: req.body.type,
            }

            if (!req.body.name || req.body.name === "") {
                throw new Error("Invalid name / empty field")
    
            }
            if (!req.body.email || req.body.email.indexOf("@") === -1) {
                throw new Error("Invalid email")
            }
    
            if (!req.body.password || req.body.password.length < 10) {
                throw new Error("The password must contain at least 10 characters")
            }
                       
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(userData.password);

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate(); 

            const userBusiness = new UserBusiness();
            const userId = await userBusiness.signupAdmin(
                id,
                userData.name,
                userData.email,
                userData.nickname,
                userData.type,
            );

            const userDatabase = new UserDatabase();
            await userDatabase.signupAdmin(
                userId,
                userData.name,
                userData.email,
                userData.nickname,
                hashPassword,
                userData.type
            );

            const autheticator = new Authenticator();
            const tokenData = autheticator.getData(req.headers.authenticator as string)
            
            if(tokenData.type !== "ADMIN"){
                throw new Error('Only administrator can register another administrator')
            }
            
            res.status(200).send({
                message: "User successfully registered"
            });
        
        } catch (error) {
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

    public async login(req: Request, res: Response){
        try {
            const userData = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password,
            }
          
            const userBusiness = new UserBusiness();
            const user = await userBusiness.getByEmailOrNickname(userData);
              
            if(user.type === "Banda" && user.isApproved !== 1){
                throw new Error("Awaiting registration approval")
            }

            const autheticator = new Authenticator();
            const accessToken = autheticator.generateToken({id: user.getId(), type: user.getType()})
            
            res.status(200).send({
                message: "User successfully registered",
                token: accessToken
            });
             
        } catch (error) {
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }
}