import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { registerInput } from  "@sidpg/chat-common"

const newUser = async(req: Request, res: Response) => {
    const user =  await req.body;
    const { success } = registerInput.safeParse(user);
    if(!success) {
        return res.json({ 
            message: "invalid credentials"
        })
    } 
    return res.json({
        message: "HEllo theere "
    })
}

export {newUser}