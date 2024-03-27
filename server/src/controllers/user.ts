import { Request, Response } from "express"
import { User, UserDocument } from "../models/user"
import {loginInput, registerInput} from '@sidpg/chat-common';
import { setCookie } from "../utils/features";
import { compare } from "bcrypt";
import { z } from "zod"
import { ErrorHandler } from "../utils/utils";



const newUser = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
        const { success } = registerInput.safeParse(userData);

        const avatar = {
            public_id: "albd",
            url: "asdf"
        }

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
                avatar: avatar
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

const login = async (req: Request, res: Response) => {
    const userData = req.body;  
    
    const { success } = loginInput.safeParse(userData); 

    if (!success) {
        return res.status(401).json({
            success: false,
            message: "Invalid inputs"
        })
    }

    try {

        const user = await User.findOne({ username: userData.username }).select("+password");
        
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        
        const isMatch = await compare(userData.password, user.password);
        
        if(!isMatch){
            throw new ErrorHandler(401, "Bhaii Please check username and password");
        }
        
        setCookie(res, user._id as string, `Welcome back ${user.username}`);
        
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        } else {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    }
}

    
export { newUser, login }
