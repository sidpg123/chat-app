import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import { User } from "../models/user"
import { Request, Response } from "express"
import { any } from "zod";
import { alert } from "../constants/events";

export const cookieOptions = {
    maxAge: 30 * 24* 60 * 1000,
    sameSite: false,
    httpOnly: true,
    secure: true
}


export const connectDb = (url: string) => {
    mongoose
    .connect(url, {dbName: "chat-app"})
    .then((data) => console.log(`Connected to database ${data.connection.host}`))
    .catch((err) => {
        throw(err)
    })
}

export const setCookie = (res: Response, userId: string, message: string) => {
    
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET as string);
    
    console.log(userId);
    
    res.status(200).cookie("chat-cookie", token, cookieOptions).json({
        success: true,
        message: message    
    })
    
}


export const emitEvent = (req:Request, event: string, users: any[], data?: any ) =>{
    console.log("Emitting event", event, data );
    
}
