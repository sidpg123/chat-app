import express from "express";
import {login, newUser} from '../controllers/user'
import { singleUpload } from "../middlewares/multer";
const app = express.Router();

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

app.post('/register',singleUpload ,newUser);
app.post('/login', login)


export default app;