import express from "express";
import userRoute from "./routes/user"
const app = express();

//imagename://containername:portno

app.use(express.json());

app.use("/api/v1/user", userRoute)

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})


app.listen(3000, () => {
    console.log("server is runnig good on port 3000 after changes");
})