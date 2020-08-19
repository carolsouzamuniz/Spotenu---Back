import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signupUSER', userController.signupUser);
userRouter.post('/signupADMIN', userController.signupAdmin);
userRouter.post('/login', userController.login);

