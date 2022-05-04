import { Document } from "mongoose";

export default interface IPool extends Document {
    poolId: String;
    ticket: number;
    user: String;
    contact: String;
    queue: String;
    station: Number;
    window: Number;
    status: string;
    timeStarted: string;
    timeEnded: string;
    createdBy: String;
}