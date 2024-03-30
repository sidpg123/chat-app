import express from "express";
import {getMyProfile, login, logout, newUser} from '../controllers/user'
import { singleUpload } from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/auth";
const app = express.Router();

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

app.post('/register',singleUpload ,newUser);
app.post('/login', login)

app.use(isAuthenticated);
app.get('/me', getMyProfile);;
app.get('/logout', logout)
export default app; 