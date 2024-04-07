import { Schema, Types, model } from "mongoose";

interface requestDocument extends Document {
    status: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId
}


const requestSchema : Schema<requestDocument> = new Schema<requestDocument> ({
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"]
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})


export const Requests = model<requestDocument>("request", requestSchema);