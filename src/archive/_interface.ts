import { Document } from "mongoose";

export default interface IArchive extends Document {
    poolId: String;
    ticket: number;
    queue: String;
    station: String;
    window: String;
    user: String;
    action: String;
    timeStarted: String;
    timeEnded: String;
    createdBy: String;
}