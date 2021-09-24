import { Document } from "mongoose";

export default interface IBranch extends Document {
    branchId: String;
    status: Boolean;
    queues: Array<String>;
    name: String;
    admin: Array<String>;
}