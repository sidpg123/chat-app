import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/auth";
import { TryCatch } from "../middlewares/errors";
import { Chat } from "../models/chat";
import { Message } from "../models/messages";
import { User } from "../models/user";
import { cookieOptions } from "../utils/features";
import { ErrorHandler } from "../utils/utils";

export const allUsers = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const users = await User.find({});

    const transformedUsers = await Promise.all(users.map(async ({ name, username, avatar, _id }) => {

        const [group, friends] = await Promise.all([
            Chat.countDocuments({ groupChat: true, members: _id }),
            Chat.countDocuments({ groupChat: false, members: _id })
        ])

        return {
            name,
            username,
            avatar: avatar.url,
            _id,
            group,
            friends
        }


    }))

    return res.status(200).json({
        success: true,
        transformedUsers
    })

})

export const allChat = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const chats = await Chat.find({}).populate("members", "name avatar").populate("creator", "name avatar");

    const transformedChats = await Promise.all(chats.map(async ({ name, members, _id, creator, groupChat }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });
        
        return {
            _id,
            name,
            groupChat,
            avatar: members.slice(0, 3).map((member) => member.avatar.url),
            members: members.map(({_id, name, avatar}) => ({
                _id,
                name,
                avatar: avatar.url
            })),
            creator: {
                name: creator?.name || "None",
                avatar: creator?.avatar.url || ""
            },
            totalMembers: members.length,
            totalMessages,
        }

    }))

    return res.status(200).json({
        success: true,
        transformedChats
    })


})

export const allMessage = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const messages = await Message.find({}).populate("sender", "name avatar").populate("chat", "groupChat");

    const transformedMessages = messages.map(({ content, attachment, _id, sender, createdAt, chat }) => ({
        _id,
        attachment,
        content,
        createdAt,
        chat: chat._id,
        groupChat: chat.groupChat,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        }
    }))

    return res.status(200).json({
        success: true,
        message: transformedMessages
    })


})

export const getDashboardStats = TryCatch(async (req: CustomRequest, res: Response) => {
    
    const [groupsCount, usersCount, messagesCount, totalChatCount ] = await Promise.all([
        Chat.countDocuments({groupChat: true}),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
    ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7daysMessages = await Message.find({
        createdAt: {
            $gte: last7Days, //gte = greater than equal to 
            $lte: today //lte = less than equal to
        }
    }).select("createdAt"); 

    const messages = new Array(7).fill(0);

    const daysInMiliseconds = 1000* 60 * 60* 24;

    last7daysMessages.forEach(message => {
        const approxIndex = (today.getTime() - message.createdAt.getTime()) / daysInMiliseconds;
        const index = Math.floor(approxIndex);
        
        messages[6 - index]++;           //Why we do ++ when we don't do it we can't see count

    })

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatCount,
        messagesChart: messages
    }
    
    return res.status(200).json({
        success: true,
        stats
    })
})

export const adminLogin = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { secretKey } = req.body;
    if (!secretKey) next(new ErrorHandler(401, "Please enter secret key"))
        // console.log("adminSecretKey", adminSecretKey);
        // console.log("secretKey", secretKey);
    const adminSecretKey = process.env.ADMIN_SECRET_KEY;
    const isMatch = secretKey === adminSecretKey;

    if (!isMatch) next(new ErrorHandler(401, "Incorrect admin key"));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET as string);

    return res.status(200).cookie("chat-app-admin", token, {...cookieOptions, maxAge: 1000 * 60 * 15}).json({
        success: true,
        Message: "Authenticated Successfully. Wellcome Boss"
    })
})

export const adminLogout = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {

    return res.status(200)
        .cookie("chat-app-admin", "", {
            ...cookieOptions, maxAge: 0,
        })
        .json({
            success: true,
            message: "Loged out Successfully"
        })
})

export const getAdminData = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        admin: true
    })
})