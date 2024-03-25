import express from "express";
import userRoute from "./routes/user"
const app = express();
import { connectDb } from './utils/features'
import  dotenv  from "dotenv";

dotenv.config()
// Assuming your .env file has a MONGO_URL variable
const mongoUrl: string = process.env.MONGO_URL as string;

const PORT = process.env.PORT

connectDb(mongoUrl)
app.use(express.json());

app.use("/api/v1/user", userRoute)

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})


app.listen(PORT, () => {
    console.log(`server is runnig good on port ${PORT}`);
})