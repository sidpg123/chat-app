import { NextFunction, Response, Request } from "express";
import { ObjectId, Types } from "mongoose";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHAT } from "../constants/events";
import { otherUser } from "../lib/helper";
import { CustomRequest } from "../middlewares/auth";
import { TryCatch, errorMiddleware } from "../middlewares/errors";
import { Chat, ChatDocument } from "../models/chat";
import { User, UserDocument } from "../models/user";
import { emitEvent } from "../utils/features";
import { ErrorHandler } from "../utils/utils";
import { Message } from "../models/messages";

interface Attachment {
    filename: string;
    filePath: string;
    mimeType: string;
    size: number;
}

export const newGroupChat = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, members } = req.body;

    if (members.length < 2) {
        return next(new ErrorHandler(402, "Group must have at least 3 members"))
    }

    const allMembers = [...members, req.user]

    const newGroup = await Chat.create({
        name: name,
        groupChat: true,
        creator: req.user,
        members: allMembers
    })


    emitEvent(req, ALERT, allMembers, "wellcome to group");
    emitEvent(req, REFETCH_CHAT, members, "Group created");

    return res.status(200).json({
        success: true,
        message: "Group created"
    })

})



export const getMyChat = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const chats = await Chat.find({ members: req.user }).populate({
        path: "members",
        select: "name username avatar",
        populate: { path: "avatar", select: "url public_id" }
    });

    const transformedChat = chats.map(({ _id, name, members, groupChat }) => {
        console.log("req.user", req.user);
        const otheruser = otherUser(members, req.user);

        let avatar = null;
        if (groupChat) {
            avatar = members.slice(0, 3).map((member: any) => member.avatar.url);
        } else if (otheruser) {
            avatar = otheruser.avatar.url;
        }
        // Corrected the comparison to exclude the req.user's _id
        const membersIds: Types.ObjectId[] = members.reduce((prev: Types.ObjectId[], curr: any) => {
            // Compare curr._id with req.user._id to exclude req.user's _id
            if (curr._id.toString() !== req.user._id.toString()) {
                prev.push(curr._id);
            }
            return prev;
        }, []);

        return {
            _id,
            groupChat,
            avatar,
            name,
            members: membersIds
        };
    });

    return res.status(200).json({
        success: true,
        transformedChat
    })
});

export const getMyGroups = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const chats = await Chat.find({
        members: req.user,
        groupChat: true,
        creator: req.user,
    }).populate({
        path: "members",
        select: "name avatar",
        populate: { path: "avatar", select: "url public_id" }
    });

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member: any) => member.avatar.url)
    }))

    return res.status(200).json({
        success: true,
        groups
    })

})

export const addMembers = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { chatId, members } = req.body;

    if (!members || members.length < 1) return next(new ErrorHandler(400, "Please provide members"));

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler(404, "Group not found"));

    if (!chat.groupChat) return next(new ErrorHandler(400, "This is not a group chat"));

    console.log("Creator:", chat.creator.toString(), "User: ", req.user._id.toString());
    console.log(chat.creator.toString() !== req.user._id.toString()); // Debugging line

    // Check if the current user is the creator of the chat
    if (chat.creator.toString() !== req.user._id.toString()) {
        // If not, return an error saying only the admin can add members
        return next(new ErrorHandler(400, "Only Admin can add members"));
    }

    // Proceed with adding members to the group
    const allMembers = [];
    for (const memberId of members) {
        const user = await User.findById(memberId, "name");
        if (user) {
            allMembers.push(user);
        } else {
            console.error("User not found:", memberId);
        }
    }

    const uniqueMembers = allMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

    // console.log(uniqueMembers);

    // Add new members to the group
    chat.members.push(...uniqueMembers);

    if (chat.members.length > 100) return next(new ErrorHandler(400, "Group members limit exceeded"));

    const allUsersName = allMembers.map((i) => i.name).join(",");

    emitEvent(req, ALERT, chat.members, `${allUsersName} has been added in the group`);

    emitEvent(req, REFETCH_CHAT, chat.members);

    // Save the changes to the chat document
    await chat.save();

    return res.status(200).json({
        success: true,
        message: "Members added successfully"
    });
});

export const removeMember = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId, chatId } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId) as Promise<ChatDocument | null>,
        User.findById(userId) as Promise<UserDocument | null>
    ]);


    // const chat = await Chat.findById(chatId);
    // const userThatWillBeRemoved = await User.findById(userId) 

    if (!chat) return next(new ErrorHandler(404, "Group not found"));

    if (!chat.groupChat) return next(new ErrorHandler(400, "This is not a group chat"));

    if (chat.creator.toString() !== req.user._id.toString()) {
        // If not, return an error saying only the admin can add members
        return next(new ErrorHandler(400, "Only Admin can add members"));
    }

    if (chat.members.length <= 3) return next(new ErrorHandler(400, "Group must have atleast 3 members"))

    chat.members = chat.members.filter(member => member._id.toString() !== userId.toString())

    // Save the changes to the chat document
    await chat.save();

    emitEvent(req, ALERT, chat.members, `${userThatWillBeRemoved} has been removed from the group`);

    emitEvent(req, REFETCH_CHAT, chat.members);

    return res.status(200).json({
        success: true,
        message: "Members removed successfully"
    });


}) 

export const leaveGroup = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat?.groupChat) return next(new ErrorHandler(400, "This is not a group chat"))

    // const chat = await Chat.findById(chatId);
    // const userThatWillBeRemoved = await User.findById(userId) 

    if (!chat) return next(new ErrorHandler(404, "Group not found"));

    const remaningMembers = chat.members.filter(member => member._id.toString() !== req.user._id.toString())


    if (chat.creator.toString() === req.user._id.toString()) {
        const randint = Math.floor(Math.random() * remaningMembers.length)
        chat.creator = remaningMembers[randint]
    }

   
    chat.members = remaningMembers
    // Save the changes to the chat document
    const user = await User.findById(req.body._id, "name")
    await chat.save();

    emitEvent(req, ALERT, chat.members, `${user} has left  the group`);

    emitEvent(req, REFETCH_CHAT, chat.members);

    return res.status(200).json({
        success: true,
        message: "Left group successfully"
    });


}) 


export const sendAttachment = TryCatch(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {chatId } = req.body;
 
    const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user._id, "name")
    ])

    if (!chat) return next(new ErrorHandler(400, "Chat not found"))

    const files = req.files || []; 

    if (files.length  as number < 1) return next(new ErrorHandler(400, "Files not selected"))

    const attachments: Attachment[] = [];

    const messageForRealTime = {
        content: "", 
        attachments , 
        sender: {_id: req.user._id, name:me?.name}, 
        chat: chatId
    }

    const messageForDB = {content: "", attachments , sender: req.user._id, chat: chatId }

    const message = await Message.create(messageForDB)

    emitEvent(req, NEW_ATTACHMENT, chat.members, {message: messageForRealTime, chatId})

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId })
  
    return res.status(200).json({
        success: true,
        message
    })

})
interface Member {
    _id: ObjectId;
    name: string;
    avatar: string; // Adjust the type as needed based on your application
}

export const getChatDetails = TryCatch(async (req:CustomRequest, res: Response, next: NextFunction) => {

    if (req.query.populate === "true") {
        
        const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

        if (!chat) return next(new ErrorHandler(404, "Chat not found"));
        console.log(chat);
        
        //@ts-ignore
        chat.members = chat.members.map(({_id, name, avatar}) => ({
            _id,
            name,
            avatar: avatar.url
        }))

        return res.status(200).json({
            success: true,
            chat
        })
    } else {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return next(new ErrorHandler(404, "Chat not found"))
        console.log(chat.members);
        return res.status(200).json({
            success: true,
            chat
        })  
    }
})