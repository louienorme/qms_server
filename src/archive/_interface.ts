import { Document } from "mongoose";

export default interface IArchive extends Document {
    archiveId: String;
    ticket: number;
    queue: String;
    station: String;
    window: String;
    user: String;
    action: String;
    timeStart: String;
    timeEnd: String;
    createdBy: String;
}