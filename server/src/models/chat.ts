import { Schema, Document, Types, model, PopulatedDoc } from "mongoose";
import { UserDocument } from "./user";

export interface ChatDocument extends Document {
    name: string;
    status?: boolean;
    groupChat: boolean;
    creator: PopulatedDoc<UserDocument>,
    members: PopulatedDoc<UserDocument>[];
}

const chatSchema: Schema<ChatDocument> = new Schema<ChatDocument>(
    {
        name: {
            type: String,
            required: true
        },
        groupChat: {
            type: Boolean,
            default: false
        },
        creator: {
            type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
            ref: "User"
        },
        members: [{
            type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
);

export const Chat = model<ChatDocument>("Chat", chatSchema);
