import express from "express";
import {newUser} from '../controllers/user'
const app = express.Router();

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

app.post("/register", newUser)


export default app;