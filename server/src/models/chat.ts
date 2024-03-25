import { Schema, Document, Types, model } from "mongoose";

interface ChatDocument extends Document {
    name: string;
    status: boolean;
    groupchat: boolean;
    creator: Types.ObjectId;
    members: Types.ObjectId[];
}

const chatSchema: Schema<ChatDocument> = new Schema<ChatDocument>(
    {
        name: {
            type: String,
            required: true
        },
        groupchat: {
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

export const ChatModel = model<ChatDocument>("Chat", chatSchema);
