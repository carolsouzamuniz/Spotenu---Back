import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";

dotenv.config();

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/user', userRouter);
app.use('/band', bandRouter);

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server running on http:\\localhost:${address.port}`)
    } else {
        console.log(`Failure upon starting server`)
    }
});