import { Request, Response } from "express"
import { User, UserDocument } from "../models/user"
import { registerInput } from  "@sidpg/chat-common"
import { setCooie } from "../utils/features";

const newUser = async(req: Request, res: Response) => {
    const user =   req.body;
    try {
        const { success } = registerInput.safeParse(user);    

        const avatar = {
            public_id: "albd",
            url: "asdf"
        }
    
        if(!success) {
            return res.json({ 
                message: "invalid credentials",
                input: req.body
            })
        } else {
            const alreadyUser = await User.findOne({ username: req.body.username });
            
            if (alreadyUser) {
                return res.json({
                    success: false,
                    message: "User already exists"
                });
            }

            try {
                const user = await User.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    avatar: avatar
                });
            
                if (!user) {
                    return res.status(401).json({
                        message: "User not created"
                    });
                }

                setCooie(res, (await user)._id as string); 
                               
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: "User not created"
                })
            }

        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "Invalid credentials"
        })
    }
    
}
    
export { newUser }