import { Schema, Types, model } from "mongoose";

interface messageDocument extends Document {
    content: string,
    sender: Types.ObjectId;
    attachment: {
        public_id: string;
        url: string;
    };
    chat: Types.ObjectId
}

const messageSchema : Schema<messageDocument> = new Schema<messageDocument> (
    {
        content: {
            type: String
        },
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

export const Message = model<messageDocument>("message", messageSchema);   