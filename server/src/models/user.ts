import { hash } from "bcrypt";
import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    username: string;
    password: string;
    bio: string;
    avatar: {
        public_id: string;
        url: string;
    };
}

const userSchema: Schema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        bio: {
            type: String,
            
        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
            
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre<UserDocument>('save', async function (next: Function) {
    if(!this.isModified("password")) return;

    this.password = await hash(this.password, 10);
})

export const User = model<UserDocument>("User", userSchema);
    