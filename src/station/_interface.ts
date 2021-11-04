import { Document } from "mongoose";

export default interface IStation extends Document {
    stationId: String,
    queueName: String,
    status: Boolean,
    stationNumber: String,
    numOfWindows: Number,
    name: String,
    admin: Array<String>
}