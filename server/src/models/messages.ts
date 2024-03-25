import { Schema, Types, model } from "mongoose";

interface messageDocument extends Document {
    sender: Types.ObjectId;
    attachment: {
        public_id: string;
        url: string;
    };
    chat: Types.ObjectId
}

const messageSchema : Schema<messageDocument> = new Schema<messageDocument> (
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },

        attachment: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    }
)

export const MessageModel = model<messageDocument>("message", messageSchema);   