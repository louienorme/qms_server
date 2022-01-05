import { Document } from "mongoose";

export default interface IPool extends Document {
    poolId: String;
    ticket: Number;
    user: String;
    queue: String;
    station: String;
    window: String;
    status: String;
    timeStarted: String;
    timeEnded: String;
}