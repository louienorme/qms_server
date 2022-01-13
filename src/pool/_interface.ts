import { Document } from "mongoose";

export default interface IPool extends Document {
    poolId: String;
    ticket: number;
    user: String;
    queue: String;
    station: Number;
    window: Number;
    status: String;
    timeStarted: String;
    timeEnded: String;
}