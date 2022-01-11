import { Document } from "mongoose";

export default interface IPool extends Document {
    poolId: String;
    ticket: number;
    user: String;
    queue: String;
    station: String;
    window: String;
    status: String;
    timeStarted: String;
    timeEnded: String;
}