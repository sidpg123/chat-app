import { loginInput, registerInput } from '@sidpg/chat-common';
import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { NEW_REQUEST, REFETCH_CHAT } from "../constants/events";
import { otherUser } from '../lib/helper';
import { CustomRequest } from "../middlewares/auth";
import { TryCatch } from "../middlewares/errors";
import { Chat } from "../models/chat";
import { Requests } from "../models/request";
import { User } from "../models/user";
import { cookieOptions, emitEvent, setCookie } from "../utils/features";
import { ErrorHandler } from "../utils/utils";



const newUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
        const { success } = registerInput.safeParse(userData);

        if(!req.file) return next(new ErrorHandler(401, "Please upload avatar"))

        // const avatar = {
        //     public_id: "albd",
        //     url: "asdf"
        // }

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
                input: userData
            });
        }

        const alreadyUser = await User.findOne({ username: userData.username });

        if (alreadyUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        try {
            const newUser = await User.create({
                name: userData.name,
                username: userData.username,
                password: userData.password,
                avatar: req.file
            });

            if (!newUser) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to create user"
                });
            }

            setCookie(res, newUser._id as string, "User created successfully");

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to create user"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

}

const login = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const { success } = loginInput.safeParse(userData);

    if (!success) return next(new ErrorHandler(401, "Invalid inputs."))

    const user = await User.findOne({ username: userData.username }).select("+password");


    if (!user) return next(new ErrorHandler(401, "User not found"))

    const isMatch = await compare(userData.password, user.password);

    if (!isMatch) return next(new ErrorHandler(401, "Password incorrect bhaii"))

    // console.log(user);


    setCookie(res, user._id as string, `Welcome back ${user.username}`);

})

const getMyProfile = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    // console.log(req.user);
    res.status(200).json({
        success: true,
        user,
    })
})

const logout = TryCatch((req: Request, res: Response) => {
    return res.status(200).cookie("chat-cookie", "", { ...cookieOptions, maxAge: 0 }).json({
        success: true,
        message: "Loged out succesfully"
    })
})

const searchUsers = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name = "" } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user })

    const allUserFromMyChat = await myChats.flatMap((chat) => chat.members)

    const allUsersExceptMeAndFriends = await User.find({
        _id: { $nin: allUserFromMyChat },
        name: { $regex: name, $options: "i" }  //regex will find like: if i give ddh then it will show siddhart, siddhi, siddhesh. options: i will say that it should be case insensetive
    })

    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url
    }))


    res.status(200).json({
        success: "true",
        users
    })
})

const sendFriendRequest = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    if (!userId) return next(new ErrorHandler(400, "Please enter User"));

    const request = await Requests.findOne({
        $or: [
            { sender: req.user._id, receiver: userId },
            { receiver: req.user._id, sender: userId },
        ]
    })
    // console.log(request);

    if (request) return next(new ErrorHandler(400, "Request already exist"));

    await Requests.create({
        sender: req.user._id,
        receiver: userId
    })

    emitEvent(req, NEW_REQUEST, [userId])

    res.status(200).json({
        success: "true",
        message: "Request sent successfully"

    })
})

const acceptFriendRequest = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { requestId, accept } = req.body;

    const request = await Requests.findById(requestId).populate("sender", "name").populate("receiver", "name");

    if (!request) return next(new ErrorHandler(404, "Request not found"));
    if (accept !== true || false) return next(new ErrorHandler(401, "accept must be a boolean"))

    // console.log("sender",request.receiver._id.toString() );
    // console.log("receiver", req.user._id.toString());

    if (request.receiver._id.toString() !== req.user._id.toString()) return next(new ErrorHandler(401, "You are not allowed to accept this request"));


    if (!accept) {
        // await Requests.deleteOne(request)
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Friend request Rejected"
        })
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            //@ts-ignore
            name: `${request.sender.name}-${request.receiver.name}`
        }),
        request.deleteOne()
    ])

    emitEvent(req, REFETCH_CHAT, members);

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id
    })

})

const notifications = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const requests = await Requests.find({ receiver: req.user._id }).populate("sender", "name avatar");

    const allRequests = requests.map(({ _id, sender }: { _id: any, sender: any }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url

        }
    }))

    return res.status(200).json({
        success: true,
        allRequests
    })



})


//Thsi will show me my friends. 
const getMyFriends = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
        members: req.user._id,
        groupChat: false
    }).populate("members", "name avatar")
    console.log(chats);

    const friends = chats.map(({ members }) => {

        const otherUsers = otherUser(members, req.user._id)

        return {
            _id: otherUsers._id,
            name: otherUsers.name,
            avatar: otherUsers.avatar.url

        }
    })

    if (chatId) {
        const chat = await Chat.findById(chatId);

        const availableFriends = friends.filter(
            (friend) => !chat?.members.includes(friend._id)    //When chat id is give it will show the frineds who are not in that chat. THiss will be used when we are adding friends in group chat
        )

        return res.status(200).json({
            succes: true,
            friends: availableFriends
        });
    } else {
        return res.status(200).json({
            success: true,
            friends
        })
    }

})




export { acceptFriendRequest, getMyFriends, getMyProfile, login, logout, newUser, notifications, searchUsers, sendFriendRequest };

