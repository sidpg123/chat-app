import express from "express";
import {newUser} from '../controllers/user'
import { singleUpload } from "../middlewares/multer";
const app = express.Router();

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

app.post('/register',singleUpload ,newUser);



export default app;