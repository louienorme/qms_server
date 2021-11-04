import { Document } from "mongoose";

export default interface IWindow extends Document {
    windowId: String,
    queueName: String,
    stationNumber: Number,
    status: Boolean,
    windowNumber: Number,
    admin: String
}