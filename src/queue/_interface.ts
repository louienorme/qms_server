import { Document } from "mongoose";

export default interface IQueue extends Document {
    queueId: String;
    status: Boolean;
    stations: Array<String>;
    name: String;
    admin: Array<String>;
}