import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import { User } from "../models/user"
import { Request, Response } from "express"
import { any } from "zod";


const cookieOptions = {
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
    
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET as string);
    

    res.status(200).cookie("chat-cookie", token, cookieOptions).json({
        success: true,
        message: message    
    })
    
}
