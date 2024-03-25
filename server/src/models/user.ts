import { Schema, model, Document } from "mongoose";

interface UserDocument extends Document {
    name: string;
    username: string;
    password: string;
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

export const UserModel = model<UserDocument>("User", userSchema);
    