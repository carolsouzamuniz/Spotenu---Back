import app from "./routes/routes";
import { AddressInfo } from "net";



const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server running on http:\\localhost:${address.port}`)
    } else {
        console.log(`Failure upon starting server`)
    }
});