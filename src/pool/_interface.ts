import { Document } from "mongoose";

export default interface IPool extends Document {
    poolId: String;
    ticket: number;
    user: String;
    queue: String;
    station: Number;
    window: Number;
    status: string;
    timeStarted: String;
    timeEnded: String;
    createdBy: String;
}