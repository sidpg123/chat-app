import express from "express";
import { addMembers, deleteChat, getChatDetails, getMessage, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachment } from "../controllers/chat";
import { isAuthenticated } from "../middlewares/auth";
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

app.get('/message/:id', getMessage)


//Get chat details, rename, delete
app.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat);  ///:id this is dynamic. So id can be anything. Hence we will put it at the end. bcz /message can also be /:id



export default app;