import { Document } from "mongoose";

export default interface IQueue extends Document {
    queueId: String;
    status: Boolean;
    numOfStations: Number;
    name: String;
    admin: Array<String>;
}