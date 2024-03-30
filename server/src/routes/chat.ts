import express, { application } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { addMembers, getChatDetails, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, sendAttachment } from "../controllers/chat";
import { attachmentMulter } from "../middlewares/multer";
const app = express.Router();

app.use(isAuthenticated);


app.post('/new', newGroupChat);
app.get('/me', getMyChat);
app.get('/me/groups', getMyGroups);
app.put('/addmembers', addMembers);
app.put('/removemember', removeMember);
app.delete('/leave/:id', leaveGroup);
app.post('/message', attachmentMulter, sendAttachment )

//Get chat details, rename, delete
app.route('/:id').get(getChatDetails).put().delete();

export default app;