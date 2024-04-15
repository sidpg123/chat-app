import express from "express";
import { adminLogin, adminLogout, allChat, allMessage, allUsers, getAdminData, getDashboardStats } from "../controllers/admin";
import { isAuthenticatedAdmin } from "../middlewares/auth";

const app = express.Router();

app.post('/verify', adminLogin);
app.get('/logout', adminLogout);
app.use(isAuthenticatedAdmin)
app.get('/', getAdminData);
app.get('/users', allUsers);
app.get('/chats', allChat);
app.get('/messages', allMessage)
app.get('/stats', getDashboardStats);





export default app;