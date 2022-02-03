import { Document } from "mongoose";

export default interface IStation extends Document {
    stationId: String,
    queueName: String,
    status: Boolean,
    stationNumber: number,
    numOfWindows: number,
    name: String,
    admin: Array<String>
}