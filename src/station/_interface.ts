import { Document } from "mongoose";

export default interface IStation extends Document {
    stationId: String,
    status: Boolean,
    stationNumber: String,
    windows: Array<String>,
    name: String,
    admin: Array<String>
}