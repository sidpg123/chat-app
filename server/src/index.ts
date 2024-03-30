import express from "express";
const app = express();
import { connectDb } from './utils/features'
import  dotenv  from "dotenv";
import { errorMiddleware } from "./middlewares/errors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user"
import chatRoute from './routes/chat'
import { createUser } from "./seeders/user";

dotenv.config()
// Assuming your .env file has a MONGO_URL variable
const mongoUrl: string = process.env.MONGO_URL as string;

const PORT = process.env.PORT

connectDb(mongoUrl)

// createUser(5);
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`server is runnig good on port ${PORT}`);
})