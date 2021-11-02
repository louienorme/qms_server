import { Document } from "mongoose";

export default interface IWindow extends Document {
    windowId: String,
    queueName: String,
    status: Boolean,
    windowNumber: String,
    admin: String
}