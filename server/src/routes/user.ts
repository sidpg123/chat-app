import express from "express";
import {acceptFriendRequest, getMyFriends, getMyProfile, login, logout, newUser, notifications, searchUsers, sendFriendRequest} from '../controllers/user'
import { singleUpload } from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/auth";
const app = express.Router();

app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

app.post('/register',singleUpload ,newUser);
app.post('/login', login)

app.use(isAuthenticated);
app.get('/me', getMyProfile);
app.get('/logout', logout);
app.get('/searchUsers', searchUsers);
app.put('/send-request', sendFriendRequest);
app.put('/accept-request', acceptFriendRequest);
app.get('/notifications', notifications)
app.get('/friends', getMyFriends);  
export default app; 