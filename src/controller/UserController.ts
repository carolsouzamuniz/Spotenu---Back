import { Response, Request } from "express";
import { HashManager } from "../service/HashManager";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../service/Authenticator";
import { UserInputDTO } from "../model/User";

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
            )

            const autheticator = new Authenticator();
            const accessToken = autheticator.generateToken({id: userId})

            res.status(200).send({token: accessToken});
        
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
}