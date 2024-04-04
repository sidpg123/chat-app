import { Schema, Types, model, Document } from "mongoose";

interface Attachment {
    public_id: string;
    url: string;
}

interface MessageDocument extends Document {
    content: string;
    sender: Types.ObjectId;
    attachment: Attachment[]; // Define attachment as an array of Attachment objects
    chat: Types.ObjectId;
}

const messageSchema: Schema<MessageDocument> = new Schema<MessageDocument>({
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
    attachment: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }]
});

export const Message = model<MessageDocument>("message", messageSchema);
