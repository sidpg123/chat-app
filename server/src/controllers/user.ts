import { Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import { loginInput, registerInput } from '@sidpg/chat-common';
import { setCookie, cookieOptions } from "../utils/features";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utils";
import { TryCatch } from "../middlewares/errors";
import { CustomRequest } from "../middlewares/auth";



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


const getMyProfile = TryCatch( async (req:CustomRequest, res:Response, next:NextFunction) =>{
    const user = await User.findById(req.user._id);
    // console.log(req.user);
    res.status(200).json({
        success: true,
        user,
        })
}) 

const logout = TryCatch( (req: Request, res: Response) => {
    return res.status(200).cookie("chat-cookie","", {...cookieOptions, maxAge:0}).json({
        success: true,
        message: "Loged out succesfully"
    })
})







export { newUser, login, getMyProfile, logout }
