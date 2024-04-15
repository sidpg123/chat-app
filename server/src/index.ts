import express from "express";
import { connectDb } from './utils/features'
import  dotenv  from "dotenv";
import { errorMiddleware } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user"
import chatRoute from './routes/chat'
import adminRoute from "./routes/admin";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { createGroupChats, createMessagesInChat, createSingleChat, createUser } from "./seeders/user";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper";
import { Message } from "./models/messages";
dotenv.config()

export const userSockerIDs = new Map();

// Assuming your .env file has a MONGO_URL variable
const mongoUrl: string = process.env.MONGO_URL as string;
const PORT = process.env.PORT
connectDb(mongoUrl)

const app = express();
const server = createServer(app);

const io = new Server(server)


// createUser(5);
// createSingleChat(10);
// createGroupChats(5);
// createMessagesInChat("660a0c2ec759f6cdfed1525c", 3);
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);
app.get('/', (req, res) => {
    res.send("hello siddharth patil")
})

// io.use((socker, next))

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);  
    const user = {
        _id: "lskjf",
        name: "demoName"
    }
    
    userSockerIDs.set(user._id.toString(), socket.id);
    console.log(userSockerIDs);
    
    console.log("testing");
    
    socket.on(NEW_MESSAGE, async({chatId, members, message}) => {
        const messageForRealtime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name   
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }
        
        
        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId
        };
        
        const membersSocket = getSockets(members);
        
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealtime
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {chatId})
        
        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.log(error);
        }

        console.log("New message", messageForRealtime);
        
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
        userSockerIDs.delete(user._id.toString());
        
    })
})





app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`server is runnig good on port ${PORT}`);
})